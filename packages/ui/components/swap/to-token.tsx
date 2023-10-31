"use client";
import { IToken } from "@/hooks/vault-hooks";
import TokenAmount from "../shared/tokens/token-amount";
import { Icon } from ".";

export interface IToToken {
  expectedReturn: BigInt;
  toToken: IToken;
  maxTo: BigInt;
}
export function ToToken({ expectedReturn, toToken, maxTo }: IToToken) {
  return (
    <div className="flex p-4 h-24 w-full bg-popover text-popover-foreground rounded-md border border-input">
      <span className="text-2xl text-popover-foreground/70 w-full shrink truncate px-3">
        <TokenAmount
          amount={expectedReturn}
          tokenDecimals={toToken.decimals}
          displayDecimals={toToken.decimals}
          showSmallAmounts
        />
      </span>
      <div className="flex flex-col gap-1 items-end">
        <div className="rounded-full bg-primary w-fit h-fit px-2 py-0.5 flex gap-x-2 items-center justify-center text-primary-foreground">
          <Icon name={toToken.symbol} />
          {toToken.symbol}
        </div>
        <TokenAmount amount={maxTo} tokenDecimals={toToken.decimals} />
      </div>
    </div>
  );
}
