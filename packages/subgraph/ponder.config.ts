import type { Config } from "@ponder/core";
import { http } from "viem";

export const config: Config = {
  networks: [
    {
      name: "goerli",
      chainId: 5,
      transport: http(process.env.PONDER_RPC_URL_5),
    },
  ],
  contracts: [
    {
      name: "PluginSetupProcessor",
      network: "goerli",
      abi: "./abis/PluginSetupProcessor.json",
      address: "0xe8b5d8d66a02cd1b9bd32a4064d7aba45f51305e",
      startBlock: 8567399,
    },
    {
      name: "VaultRepo",
      network: "goerli",
      startBlock: 8567399,
      address: "0xef7De2e4ec36211B22361EB7DA97f9F1f3152053",
      abi: [
        "./abis/PluginRepo.json",
        "./abis/ERC1967Proxy.json"
      ]
    }
  ],
};
