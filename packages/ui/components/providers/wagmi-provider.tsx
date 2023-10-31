import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_ID ?? "",

    // Required
    appName: "Your App Name",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
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
