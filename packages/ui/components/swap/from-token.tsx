"use client";
import { parseTokenAmount } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { NumberPattern } from "@/lib/constants/patterns";
import { MaxButton } from "../shared/buttons/max-button";
import { Input } from "../shared/_components/swap-input";
import { IToken } from "@/hooks/vault-hooks";

import { UseFormReturn, UseFormRegister } from "react-hook-form";
import { IFormInputs, Icon } from ".";

export interface IFromToken {
  form: UseFormReturn<IFormInputs, any, undefined>;
  register: UseFormRegister<IFormInputs>;
  maxFrom: BigInt;
  fromToken: IToken;
  setMaxValue: () => void;
}

export function FromToken({
  form,
  register,
  maxFrom,
  fromToken,
  setMaxValue,
}: IFromToken) {
  return (
    <FormField
      control={form.control}
      name="fromToken"
      rules={{
        pattern: {
          value: NumberPattern,
          message: "Invalid token amount",
        },
        validate: {
          max: (v) =>
            maxFrom === undefined ||
            BigInt(parseTokenAmount(v, fromToken.decimals)?.toString() ?? 0) <
              BigInt(maxFrom.toString()) ||
            "Token amount too high",
        },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>From:</FormLabel>
          <FormControl>
            <div className="flex p-4 h-24 bg-popover text-popover-foreground rounded-md border border-input">
              <Input
                {...field}
                className="border-none text-2xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield] focus:ring-0 focus:ring-offset-0"
                autoFocus
                placeholder={"0.0"}
              />
              <div className="flex flex-col gap-1 items-end">
                <div className="rounded-full bg-primary w-fit h-fit px-2 py-0.5 flex gap-x-2 items-center justify-center text-primary-foreground">
                  <Icon name={fromToken.symbol} />
                  {fromToken.symbol}
                </div>
                {maxFrom === undefined || (
                  <MaxButton
                    max={maxFrom}
                    decimals={fromToken.decimals}
                    setMaxValue={setMaxValue}
                  />
                )}
              </div>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
