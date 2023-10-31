import React, { ReactNode } from "react";

import { VariantProps, cva } from "class-variance-authority";
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

/**
 * This is a Card component that supports various variants and padding options.
 * It also provides a loading state with a pulse animation.
 */

const cardVariants = cva(
  "w-full rounded-lg h-fit shadow-md text-clip relative overflow-x-auto",
  {
    variants: {
      variant: {
        default: "bg-highlight ",
        warning:
          "bg-destructive-background text-destructive-foreground shadow-lg",
        light: "bg-popover",
        outline: "bg-transparent border border-border shadow-none",
      },
      size: {
        default: "px-5 py-4",
        sm: "px-4 py-2",
        lg: "sm:px-10 p-6 sm:py-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Variants used when the `loading` property's value is true.
 * This uses the `size` prop passed to the Card component to also determine a min-height to give the Card component,
 * such that the pulse animation is sufficiently visible.
 */
const loadingVariants = cva("animate-pulse", {
  variants: {
    size: {
      default: "min-h-[100px]",
      sm: "min-h-[50px]",
      lg: "min-h-[150px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/**
 * Card component properties.
 * @property className - Optional custom CSS class name.
 * @property variant - Visual style of the card. Can be "default", "warning", or "light".
 * @property padding - Padding applied to the card. Can be "default", "sm", or "lg".
 * @property loading - Optional boolean flag to enable/disable the loading state.
 */
export interface CardProps
  extends React.BaseHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  loading?: boolean;
}

/**
 * A Card component that supports various visual styles, padding options, and a loading state.
 * @param props.variant - Variant of the card that defines its styling.
 * @param props.size - Size of the card as defined by padding.
 * @param props.loading - Optional boolean flag to enable/disable the loading state, which will show a pulse animation. It is recommended to also pass a minimum height when providing a loading variable.
 * @returns A Card React element.
 * @remarks This component is built using the class-variance-authority library for managing CSS classes. You can pass a loading property to enable a loading state with a pulse animation.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, loading = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, className }),
          loading && loadingVariants({ size })
        )}
        {...props}
      >
        {!loading && props.children}
      </div>
    );
  }
);
Card.displayName = "Card";

export { Card };

export interface CardProps
  extends React.BaseHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  loading?: boolean;
}

const mainCardVariants = cva("w-full flex flex-col gap-y-2", {
  variants: {},
  defaultVariants: {},
});

const iconBackgroundVariants = cva("rounded-md p-2", {
  variants: {
    variant: {
      default: "bg-popover",
      light: "bg-highlight",
      warning: "bg-destructive/20",
      outline: "bg-popover",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Default header for the MainCard component.
 * @param props.value The numeric value to be displayed in the header.
 * @param props.label The label of the value to be displayed in the header.
 * @param props.truncateMobile Whether or not to hide all but the first word of the label on mobile. Defaulted to `false`.
 * @returns A div to be used as the header for the MainCard component.
 */
export const DefaultMainCardHeader = ({
  value,
  label,
  truncateMobile = false,
}: {
  value: number | string;
  label: string;
  truncateMobile?: boolean;
}) => {
  const split = label.split(" ");

  return (
    <div className="flex flex-row items-end gap-x-2 font-normal">
      <span className="text-3xl">{value}</span>
      {!truncateMobile ? (
        <p className="mb-1 text-base leading-4">{label}</p>
      ) : (
        <p className="mb-1 text-base leading-4">
          {split[0]}{" "}
          <span className="hidden xs:inline">{split.slice(1).join(" ")}</span>
        </p>
      )}
    </div>
  );
};

/**
 * MainCardProps represents the properties for the MainCard component.
 * @property icon - An icon to be displayed on the card, next to the header. Typically a React Icon component.
 * @property header - A header content that is displayed on the card.
 * @property aside - An aside content that is displayed on the card, typically additional information or actions.
 */
export interface MainCardProps
  extends CardProps,
    VariantProps<typeof mainCardVariants> {
  icon: IconType;
  header: ReactNode;
  aside?: ReactNode;
}

/**
 * The MainCard component is a card with an icon, header, and aside section.
 * It is designed to serve as a main container for other components and elements.
 * @param {MainCardProps} props - The properties for the MainCard component.
 * @returns A MainCard React element.
 */
const MainCard = React.forwardRef<HTMLDivElement, MainCardProps>(
  ({ className, header, aside, icon, ...props }, ref) => {
    const IconWrapper = { icon };

    return (
      <Card
        ref={ref}
        className={cn(mainCardVariants({}), className, "gap-y-4")}
        {...props}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-x-3 lg:gap-x-4">
            <div className={iconBackgroundVariants({ variant: props.variant })}>
              <IconWrapper.icon className="h-5 w-5 shrink-0 text-primary" />
            </div>
            <div className={cn("text-2xl font-medium")}>{header}</div>
          </div>
          <>{aside && aside}</>
        </div>
        <div className="space-y-2 sm:space-y-3">{props.children}</div>
      </Card>
    );
  }
);
MainCard.displayName = "MainCard";

export { MainCard, mainCardVariants as cardVariants };
