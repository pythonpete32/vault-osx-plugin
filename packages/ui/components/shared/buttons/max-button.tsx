import TokenAmount from "../tokens/token-amount";

export type MaxButtonProps = {
  max: BigInt;
  decimals: number;
  setMaxValue: () => void;
};
export const MaxButton = ({ max, decimals, setMaxValue }: MaxButtonProps) => {
  return (
    <div className="inline-flex items-center justify-center gap-x-1">
      <TokenAmount
        amount={max}
        tokenDecimals={decimals}
        displayDecimals={6}
        className="whitespace-nowrap"
      />
      <button
        type="button"
        onClick={() => setMaxValue()}
        className="w-full p-1 h-fit text-blue-500 underline underline-offset-2 active:scale-95 hover:text-blue-300"
      >
        Max
      </button>
    </div>
  );
};
