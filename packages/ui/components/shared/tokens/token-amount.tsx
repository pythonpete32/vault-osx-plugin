import { toAbbreviatedTokenAmount } from "@/lib/utils";

interface TokenAmountProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount?: BigInt | null;
  tokenDecimals?: number | null;
  amountFloat?: number;
  symbol?: string;
  sign?: string;
  displayDecimals?: number;
  showSmallAmounts?: boolean;
}

/**
 * @param className - ClassName to pass to the span element
 * @param amount - The amount of the given token, either as a BigInt or a BigNumber (from ethers.js)
 * @param amountFloat - The amount of the given token, as a float. Used only if amount and tokenDecimals are not given.
 * @param tokenDecimals - The amount of decimals the token uses to represent its value
 * @param displayDecimals - The amount of decimals to display the amount with. Must be in the range 0-20 (inclusive). Defaults to 2.
 * @param symbol - Optional symbol of the token, e.g. LINK, ETH, JSCL. Default is to now show any symbol.
 * @param sign - Optional sign. Default value '' (empty string). Recommended values: '' (empty string), + (plus) or - (minus).
 * @returns A span element containing the abbreviated token amount, optionally with a sign and token symbol
 */
const TokenAmount = ({
  className = "",
  amount,
  amountFloat,
  tokenDecimals,
  displayDecimals,
  symbol = "",
  sign = "",
  showSmallAmounts,
  ...props
}: TokenAmountProps) => {
  return (
    <span className={className} {...props}>
      {sign}
      {toAbbreviatedTokenAmount({
        value: amount,
        tokenDecimals,
        displayDecimals,
        valueAsFloat: amountFloat,
        showSmallAmounts,
      })}
      &nbsp;
      {symbol}
    </span>
  );
};

export default TokenAmount;
