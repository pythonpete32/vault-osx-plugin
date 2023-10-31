"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { MainCard } from "../shared/_components/main-card";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { useAccount } from "wagmi";
import { Form } from "@/components/ui/form";
import { DAI, Loading, THEDAO } from "@/components/shared/icons";
import TokenAmount from "../shared/tokens/token-amount";
import { ErrorText } from "../shared/_components/error-wrapper";
import {
  ConditionalButton,
  ConnectWalletWarning,
  InsufficientGasWarning,
  Warning,
} from "@/components/shared/buttons/conditional-button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared/accordion";
import CategoryList from "@/components/shared/catagory-list";
import { ToToken } from "./to-token";
import { FromToken } from "./from-token";
import { SwapButton } from "./SwapButton";
import { useTokenContext } from "@/providers/token-context";

export interface IFormInputs {
  fromToken: string;
}

export const Icon = ({ name }: { name: string }) => {
  if (name === "USDC") return <DAI className="h-5 w-5" />;
  else return <THEDAO className="h-5 w-5 bg-white rounded-3xl " />;
};

export default function Swap() {
  const { address, isConnected } = useAccount();

  const {
    form,
    swap,
    setSwap,
    vaultToken,
    onSubmit,
    approveToken,
    depositToken,
    enoughGas,
    exchange,
    fromAmount,
    fromToken,
    isApproved,
    isSwapping,
    setMaxValue,
    toToken,
    maxFrom,
    maxTo,
  } = useTokenContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = form;

  const { error, estimatedGas, expectedReturn, isLoading, performExchange } =
    exchange;
  const {
    error: approveError,
    isLoading: approveLoading,
    writeAprovedAsync,
  } = approveToken;

  return (
    <main className="px-10 py-14">
      <div className="w-full min-h-full flex items-center justify-center ">
        <MainCard
          header={swap.toUpperCase() + " " + vaultToken.name}
          icon={HiArrowsRightLeft}
          className="max-w-[40rem] relative gap-y-2 bg-muted/10 backdrop-blur"
          variant="outline"
        >
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
              <FromToken
                form={form}
                register={register}
                maxFrom={maxFrom}
                fromToken={fromToken}
                setMaxValue={setMaxValue}
              />

              <SwapButton
                setSwap={setSwap}
                swap={swap}
                setValue={setValue}
                isSwapping={isSwapping}
              />

              <ToToken
                expectedReturn={expectedReturn}
                toToken={toToken}
                maxTo={maxTo}
              />

              <ErrorText name="Token amount" error={errors.fromToken} />
              {/* Approve button */}
              {isConnected && !isApproved && (
                <ConditionalButton
                  className="leading-4 w-full mb-1"
                  flex="flex-col"
                  conditions={[
                    {
                      when: !isConnected,
                      content: <ConnectWalletWarning action="to approve" />,
                    },
                    {
                      when: approveError !== null,
                      content: <Warning>Could not approve</Warning>,
                    },
                    {
                      when: writeAprovedAsync === undefined || isLoadingApprove,
                      content: (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      ),
                    },
                  ]}
                  type="button"
                  disabled={isApproved}
                >
                  Approve
                </ConditionalButton>
              )}

              {/* Submit button */}
              <ConditionalButton
                className="leading-4 w-full mb-1"
                flex="flex-col"
                conditions={[
                  {
                    when: !isConnected,
                    content: <ConnectWalletWarning action="to swap" />,
                  },
                  {
                    when: !enoughGas,
                    content: <InsufficientGasWarning />,
                  },
                  {
                    when: !isValid,
                    content: <Warning>Form input is invalid</Warning>,
                  },
                  {
                    when: isLoading || isSwapping,
                    content: <Loading className="w-5 h-5" />,
                  },
                  {
                    when: fromAmount !== null && fromAmount == 0n,
                    content: <Warning>{fromToken.name} amount is zero</Warning>,
                  },
                  {
                    when: error !== null,
                    content: <Warning>{error?.message ?? "ERROR"}</Warning>,
                  },
                  {
                    when: !isApproved,
                    content: <Warning>Approve first before swapping</Warning>,
                  },
                ]}
                type="submit"
              >
                Swap
              </ConditionalButton>
            </form>
          </Form>
          <hr className="border-2 border-accent" />
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            defaultValue="0"
          >
            <AccordionItem value="0">
              <AccordionTrigger className="flex w-full flex-col">
                <p className="lowercase first-letter:capitalize">Summary</p>
              </AccordionTrigger>
              <AccordionContent className="mt-1">
                <CategoryList
                  categories={[
                    {
                      title: "Gas",
                      items: [
                        {
                          label: "Estimated gas fee",
                          value: (
                            <TokenAmount
                              amount={estimatedGas}
                              tokenDecimals={18}
                              symbol={"ETH"}
                              showSmallAmounts
                              displayDecimals={8}
                            />
                          ),
                        },
                      ],
                    },
                    {
                      title: "Value to be received",
                      items: [
                        {
                          label: "Expected",
                          value: (
                            <TokenAmount
                              amount={expectedReturn}
                              tokenDecimals={vaultToken.decimals}
                              symbol={toToken.name}
                              showSmallAmounts
                              displayDecimals={vaultToken.decimals}
                            />
                          ),
                        },
                      ],
                    },
                  ]}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </MainCard>
      </div>
    </main>
  );
}
