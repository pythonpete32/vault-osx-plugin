import {
  useVaultToken,
  useDepositToken,
  IToken,
  useExchange,
  IUseExchangeReturn,
  useApprovedAmount,
  useApproveDepositToken,
  UseApproveReturn,
} from "@/hooks/vault-hooks";
import { parseTokenAmount } from "@/lib/utils";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export interface IFormInputs {
  fromToken: string;
}

interface TokenContextProps {
  form: UseFormReturn<IFormInputs, any, undefined>;
  vaultToken: IToken;
  depositToken: IToken;
  fromToken: IToken;
  toToken: IToken;
  isSwapping: boolean;
  fromAmount: BigInt | null;
  setMaxValue: () => void;
  maxFrom: BigInt;
  maxTo: BigInt;
  exchange: IUseExchangeReturn;
  enoughGas: boolean;
  isApproved: boolean;
  approveToken: UseApproveReturn;
  onSubmit: () => void;
  swap: "Mint" | "Burn";
  setSwap: Dispatch<SetStateAction<"Mint" | "Burn">>;
}

export const TokenContext = createContext<TokenContextProps | undefined>(
  undefined
);

export const TokenProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const form = useForm<IFormInputs>({
    defaultValues: {
      fromToken: "0.0",
    },
    shouldUnregister: false,
    mode: "onChange",
  });

  const { address, isConnected } = useAccount();
  const { token: vaultToken } = useVaultToken({ address });
  const { token: depositToken } = useDepositToken({ address });
  const { data: nativeBalance } = useBalance({ address: address });
  const [isSwapping, setIsSwapping] = useState(false);
  const [swap, setSwap] = useState<"Mint" | "Burn">("Mint");
  const fromToken = swap === "Mint" ? depositToken : vaultToken;
  const toToken = swap === "Mint" ? vaultToken : depositToken;
  const fromAmountWatch = useWatch({
    control: form.control,
    name: "fromToken",
  });
  const fromAmount = parseTokenAmount(fromAmountWatch, fromToken.decimals);
  let maxFrom = swap === "Mint" ? depositToken.balance : vaultToken.balance;
  let maxTo = swap === "Mint" ? vaultToken.balance : depositToken.balance;

  const setMaxValue = () => {
    if (maxFrom !== undefined) {
      form.setValue("fromToken", formatUnits(maxFrom, fromToken.decimals));
    }
  };

  const exchange = useExchange({
    swapKind: swap,
    amount: fromAmount,
    enabled: fromAmount !== null || fromAmount !== undefined,
  });

  const { error, estimatedGas, expectedReturn, isLoading, performExchange } =
    exchange;

  let enoughGas = false;
  if (!!estimatedGas && nativeBalance !== undefined) {
    enoughGas = BigInt(nativeBalance.value) > BigInt(estimatedGas.toString());
  }

  const { approvedAmount } = useApprovedAmount({ userAddress: address });
  // const approvedAmount = 0n;

  const isApproved =
    swap === "Burn" ||
    (approvedAmount !== undefined &&
      fromAmount !== null &&
      approvedAmount > BigInt(fromAmount.toString() ?? 0)) ||
    (approvedAmount !== undefined && // In case the input is invalid.
      fromAmount === null &&
      approvedAmount > 0);

  const approveToken = useApproveDepositToken({ userAddress: address });

  const onSubmit = () => {
    setIsSwapping(true);
    performExchange();
  };

  return (
    <TokenContext.Provider
      value={{
        form,
        vaultToken,
        depositToken,
        fromToken,
        toToken,
        maxFrom,
        maxTo,
        fromAmount,
        isSwapping,
        setMaxValue,
        exchange,
        enoughGas,
        isApproved,
        approveToken,
        onSubmit,
        swap,
        setSwap,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

import { useContext } from "react";
import { useForm, UseFormReturn, useWatch } from "react-hook-form";
import { formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";

export function useTokenContext(): TokenContextProps {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useTokenContext must be used within a TokenProvider");
  }
  return context;
}
