import { ThemeProvider } from "next-themes";
import { FC, PropsWithChildren } from "react";
import { WagmiProvider } from "./wagmi-provider";
import { Toaster } from "@/components/ui/toaster";
import { CommandProvider } from "./command-provider";
import { TokenProvider } from "./token-context";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <WagmiProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TokenProvider>
            {children}
            <Toaster />
          </TokenProvider>
        </ThemeProvider>
      </WagmiProvider>
    </>
  );
};
export default Providers;
