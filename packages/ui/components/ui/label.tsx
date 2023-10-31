import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { HiQuestionMarkCircle } from "react-icons/hi2";

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  tooltip?: string;
}

/**
 * The Label component is a pre-styled label element based on @radix-ui/react-label.
 * It extends the base LabelPrimitive.Root component with additional styling.
 * @param props - Props for the Label component.
 * @returns A Label React element.
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, tooltip, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "flex flex-row items-center gap-x-1 font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-80",
      className
    )}
    {...props}
  >
    {children}
    {tooltip && (
      <Tooltip>
        <TooltipTrigger className="rounded-full hover:cursor-help">
          <HiQuestionMarkCircle className="h-5 w-5 shrink-0 text-highlight-foreground/80" />
        </TooltipTrigger>
        <TooltipContent className="max-w-[400px] font-normal">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    )}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
