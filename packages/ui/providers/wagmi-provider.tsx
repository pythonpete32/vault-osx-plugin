import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { goerli } from "wagmi/chains";
import siteConfig from "@/config/site";

const config = createConfig(
  getDefaultConfig({
    chains: [goerli],
    // Required API Keys
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_ID ?? "",

    // Required
    appName: siteConfig.title,

    // Optional
    appDescription: siteConfig.description,
    appUrl: siteConfig.url,
    appIcon: "https://family.co/logo.png",
  })
);

export function WagmiProvider({ children }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        theme="midnight"
        mode="dark"
        options={{
          hideBalance: false,
        }}
      >
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
