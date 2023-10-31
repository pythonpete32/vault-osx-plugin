import { HookCallbacks } from "async_hooks";
import { Address } from "viem";

interface IVaultTokenBalance {
  address: Address | undefined;
  watch?: boolean;
}

export interface IToken {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  balance: bigint;
}

export const useVaultToken = ({
  address,
  watch = true,
}: IVaultTokenBalance) => {
  const token: IToken = {
    address: "0x1234",
    name: "Vault Token",
    symbol: "VT",
    decimals: 18,
    balance: 69_000_000_000_000_000_000n,
  };
  return { token };
};

export const useDepositToken = ({
  address,
  watch = true,
}: IVaultTokenBalance) => {
  const token: IToken = {
    address: "0x4567",
    name: "USDC Coin",
    symbol: "USDC",
    decimals: 6,
    balance: 420_000_000n,
  };
  return { token };
};

interface IUseExchange {
  swapKind: "Mint" | "Burn";
  amount: BigInt | undefined | null;
  enabled: boolean;
}

export interface IUseExchangeReturn {
  isLoading: boolean;
  error: Error | null;
  estimatedGas: BigInt | null;
  expectedReturn: BigInt | null;
  performExchange: () => Promise<any>;
  contractAddress: Address | null;
}

export const useExchange = ({
  swapKind,
  amount,
  enabled,
}: IUseExchange): IUseExchangeReturn => {
  return {
    isLoading: false,
    error: new Error("Not implemented"),
    estimatedGas: 234n,
    expectedReturn: 420n,
    performExchange: async () =>
      new Promise((resolve) => setTimeout(() => resolve("exchanged"), 1000)),
    contractAddress: "0x1234",
  };
};

interface IUseApprovedAmount {
  userAddress: Address | undefined | null;
  enabled?: boolean;
}

export const useApprovedAmount = ({
  userAddress,
  enabled = true,
}: IUseApprovedAmount) => {
  return {
    isLoading: false,
    // error: new Error("Not implemented"),
    approvedAmount: 69420n,
  };
};

export interface UseApproveReturn {
  writeAprovedAsync: () => Promise<any>;
  error: Error | null;
  isLoading: boolean;
}

export const useApproveDepositToken = ({
  userAddress,
  enabled = true,
}: IUseApprovedAmount): UseApproveReturn => {
  return {
    writeAprovedAsync: async () =>
      new Promise((resolve) => setTimeout(() => resolve("approved"), 1000)),
    error: null,
    // error: new Error("Not implemented"),
    isLoading: false,
  };
};
