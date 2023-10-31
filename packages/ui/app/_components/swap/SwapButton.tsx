"use client";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";
import { IFormInputs } from "./swap";

export interface ISwapButton {
  setSwap: Dispatch<SetStateAction<"Mint" | "Burn">>;
  swap: string;
  setValue: UseFormSetValue<IFormInputs>;
  isSwapping: boolean;
}

export function SwapButton({
  setSwap,
  swap,
  setValue,
  isSwapping,
}: ISwapButton) {
  return (
    <div className="absolute left-1/2 -translate-y-5 -translate-x-1/2">
      <Button
        onClick={() => {
          setSwap(swap === "Burn" ? "Mint" : "Burn");
          setValue("fromToken", "0.0");
        }}
        className="h-8 px-0 w-8"
        type="button"
        disabled={isSwapping}
      >
        <span className="sr-only">Swap order</span>
        <HiOutlineArrowsUpDown className="h-5 w-5" />
      </Button>
    </div>
  );
}
