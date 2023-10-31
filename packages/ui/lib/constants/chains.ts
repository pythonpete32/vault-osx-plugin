import { SupportedNetwork as SdkSupportedNetworks } from "@aragon/sdk-client-common";
import { CONFIG } from "./config";

const {
  NEXT_PUBLIC_INFURA_API_KEY,
  NEXT_PUBLIC_ETHERSCAN_API_KEY,
  NEXT_PUBLIC_POLYGONSCAN_API_KEY,
} = process.env;

export const SUPPORTED_CHAIN_ID = [
  1, 5, 137, 8453, 80001, 84531, 42161, 421613,
] as const;

export type SupportedChainID = (typeof SUPPORTED_CHAIN_ID)[number];

export function isSupportedChainId(
  chainId: number
): chainId is SupportedChainID {
  return SUPPORTED_CHAIN_ID.some((id) => id === chainId);
}

export const ENS_SUPPORTED_NETWORKS = ["ethereum", "goerli"];
export const NETWORKS_WITH_CUSTOM_REGISTRY = [
  "base",
  "base-goerli",
  "mumbai",
  "polygon",
];
export const L2_NETWORKS = NETWORKS_WITH_CUSTOM_REGISTRY;

const SUPPORTED_NETWORKS = [
  "arbitrum",
  "arbitrum-test",
  "base",
  "base-goerli",
  "ethereum",
  "goerli",
  "mumbai",
  "polygon",
] as const;

export function getSupportedNetworkById(
  id: SupportedChainID
): SupportedNetworks | undefined {
  return Object.entries(CHAIN_METADATA).find(
    (entry) => entry[1].id === id
  )?.[0] as SupportedNetworks;
}

export function findNetworkKeyById(id: number | string): SupportedNetworks {
  id = Number(id);
  for (const [key, value] of Object.entries(CHAIN_METADATA)) {
    if (value.id === id) {
      return key as SupportedNetworks;
    }
  }
  return "unsupported";
}

export type SupportedNetworks =
  | (typeof SUPPORTED_NETWORKS)[number]
  | "unsupported";

export function toSupportedNetwork(network: string): SupportedNetworks {
  return SUPPORTED_NETWORKS.some((n) => n === network)
    ? (network as SupportedNetworks)
    : "unsupported";
}

/**
 * Get the network name with given chain id
 * @param chainId Chain id
 * @returns the name of the supported network or null if network is unsupported
 */
export function getSupportedNetworkByChainId(
  chainId: number
): SupportedNetworks | undefined {
  if (isSupportedChainId(chainId)) {
    return Object.entries(CHAIN_METADATA).find(
      (entry) => entry[1].id === chainId
    )?.[0] as SupportedNetworks;
  }
}

export type NetworkDomain = "L1 Blockchain" | "L2 Blockchain";

/* CHAIN DATA =============================================================== */

export type NativeTokenData = {
  name: string;
  symbol: string;
  decimals: number;
};

export type ApiMetadata = {
  networkId: string;
  nativeTokenId: string;
};

export type ChainData = {
  id: SupportedChainID;
  name: string;
  domain: NetworkDomain;
  isTestnet: boolean;
  mainnet?: SupportedNetworks;
  explorer: string;
  logo: string;
  rpc: string[];
  nativeCurrency: NativeTokenData;
  etherscanApi: string;
  etherscanApiKey?: string;
  covalent?: ApiMetadata;
  coingecko?: ApiMetadata;
  alchemyApi: string;
  supportsEns: boolean;
  ipfs?: string;
};

export const CHAIN_METADATA: Record<SupportedNetworks, ChainData> = {
  arbitrum: {
    id: 42161,
    name: "Arbitrum One",
    domain: "L2 Blockchain",
    logo: "https://bridge.arbitrum.io/logo.png",
    explorer: "https://arbiscan.io/",
    isTestnet: false,
    rpc: ["https://arb1.arbitrum.io/rpc", "wss://arb1.arbitrum.io/ws"],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    etherscanApi: "https://api.arbiscan.io/api",
    alchemyApi: "https://arb-mainnet.g.alchemy.com/v2",
    coingecko: {
      networkId: "arbitrum-one",
      nativeTokenId: "arbitrum",
    },
    covalent: {
      networkId: "arbitrum-mainnet",
      nativeTokenId: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    supportsEns: false,
    ipfs: "https://prod.ipfs.aragon.network",
  },
  base: {
    id: 8453,
    name: "Base",
    domain: "L2 Blockchain",
    logo: "https://mirror-media.imgix.net/publication-images/cgqxxPdUFBDjgKna_dDir.png?h=250&w=250",
    explorer: "https://basescan.org/",
    isTestnet: false,
    rpc: ["https://developer-access-mainnet.base.org"],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    etherscanApi: "https://api.basescan.org/api",
    etherscanApiKey: "",
    covalent: {
      networkId: "base-mainnet",
      nativeTokenId: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    alchemyApi: "",
    supportsEns: false,
    ipfs: "https://prod.ipfs.aragon.network",
  },
  "base-goerli": {
    id: 84531,
    name: "Base Goerli",
    domain: "L2 Blockchain",
    logo: "https://mirror-media.imgix.net/publication-images/cgqxxPdUFBDjgKna_dDir.png?h=250&w=250",
    explorer: "https://goerli.basescan.org/",
    isTestnet: true,
    mainnet: "base",
    rpc: ["https://goerli.base.org"],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    etherscanApi: "https://api.basescan.org/api",
    etherscanApiKey: "",
    covalent: {
      networkId: "base-testnet",
      nativeTokenId: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    alchemyApi: "",
    supportsEns: false,
    ipfs: "https://prod.ipfs.aragon.network",
  },
  ethereum: {
    id: 1,
    name: "Ethereum",
    domain: "L1 Blockchain",
    logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    explorer: "https://etherscan.io/",
    isTestnet: false,
    rpc: [
      `https://mainnet.infura.io/v3/${NEXT_PUBLIC_INFURA_API_KEY}`,
      `wss://mainnet.infura.io/ws/v3/${NEXT_PUBLIC_INFURA_API_KEY}`,
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    etherscanApi: "https://api.etherscan.io/api",
    etherscanApiKey: NEXT_PUBLIC_ETHERSCAN_API_KEY,
    coingecko: {
      networkId: "ethereum",
      nativeTokenId: "ethereum",
    },
    covalent: {
      networkId: "eth-mainnet",
      nativeTokenId: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    alchemyApi: "https://eth-mainnet.g.alchemy.com/v2",
    supportsEns: true,
    ipfs: "https://prod.ipfs.aragon.network",
  },
  polygon: {
    id: 137,
    name: "Polygon",
    domain: "L2 Blockchain",
    logo: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
    explorer: "https://polygonscan.com/",
    isTestnet: false,
    rpc: [
      `https://polygon-mainnet.infura.io/v3/${NEXT_PUBLIC_INFURA_API_KEY}`,
      `wss://polygon-mainnet.infura.io/ws/v3/${NEXT_PUBLIC_INFURA_API_KEY}`,
    ],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    etherscanApi: "https://api.polygonscan.com/api",
    etherscanApiKey: NEXT_PUBLIC_POLYGONSCAN_API_KEY,
    coingecko: {
      networkId: "polygon-pos",
      nativeTokenId: "matic-network",
    },
    covalent: {
      networkId: "matic-mainnet",
      nativeTokenId: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    alchemyApi: "https://polygon-mainnet.g.alchemy.com/v2",
    supportsEns: false,
    ipfs: "https://prod.ipfs.aragon.network",
  },
  "arbitrum-test": {
    id: 421613,
    name: "Arbitrum Goerli",
    domain: "L2 Blockchain",
    logo: "https://bridge.arbitrum.io/logo.png",
    explorer: "https://testnet.arbiscan.io/",
    isTestnet: true,
    mainnet: "arbitrum",
    rpc: ["https://goerli-rollup.arbitrum.io/rpc"],
    nativeCurrency: {
      name: "Goerli Ether",
      symbol: "ETH",
      decimals: 18,
    },
    etherscanApi: "https://api-goerli.arbiscan.io/api",
    alchemyApi: "https://arb-goerli.g.alchemy.com/v2",
    covalent: {
      networkId: "arbitrum-goerli",
      nativeTokenId: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    supportsEns: false,
    ipfs: "https://test.ipfs.aragon.network",
  },
  goerli: {
    id: 5,
    name: "Goerli",
    domain: "L1 Blockchain",
    logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    explorer: "https://goerli.etherscan.io/",
    isTestnet: true,
    mainnet: "ethereum",
    rpc: [
      `https://goerli.infura.io/v3/${NEXT_PUBLIC_INFURA_API_KEY}`,
      `wss://goerli.infura.io/ws/v3/${NEXT_PUBLIC_INFURA_API_KEY}`,
    ],
    nativeCurrency: {
      name: "Goerli Ether",
      symbol: "ETH",
      decimals: 18,
    },
    etherscanApi: "https://api-goerli.etherscan.io/api",
    etherscanApiKey: NEXT_PUBLIC_ETHERSCAN_API_KEY,
    covalent: {
      networkId: "eth-goerli",
      nativeTokenId: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    alchemyApi: "https://eth-goerli.g.alchemy.com/v2",
    supportsEns: true,
    ipfs: "https://test.ipfs.aragon.network",
  },
  mumbai: {
    id: 80001,
    name: "Mumbai",
    domain: "L2 Blockchain",
    logo: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
    explorer: "https://mumbai.polygonscan.com/",
    isTestnet: true,
    mainnet: "polygon",
    rpc: [
      `https://polygon-mumbai.infura.io/v3/${NEXT_PUBLIC_INFURA_API_KEY}`,
      `wss://polygon-mumbai.infura.io/ws/v3/${NEXT_PUBLIC_INFURA_API_KEY}`,
    ],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    etherscanApi: "https://api-testnet.polygonscan.com/api",
    etherscanApiKey: NEXT_PUBLIC_POLYGONSCAN_API_KEY,
    covalent: {
      networkId: "matic-mumbai",
      nativeTokenId: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    alchemyApi: "https://polygon-mumbai.g.alchemy.com/v2",
    supportsEns: false,
    ipfs: "https://test.ipfs.aragon.network",
  },
  unsupported: {
    id: 1,
    name: "Unsupported",
    domain: "L1 Blockchain",
    logo: "",
    explorer: "",
    isTestnet: false,
    rpc: [],
    nativeCurrency: {
      name: "",
      symbol: "",
      decimals: 18,
    },
    etherscanApi: "",
    alchemyApi: "",
    supportsEns: false,
    ipfs: "",
  },
};

export const chainExplorerAddressLink = (
  network: SupportedNetworks,
  address: string
) => {
  return `${CHAIN_METADATA[network].explorer}address/${address}`;
};

/**
 * Maps app network context name to SDK network name
 * @param appNetwork supported network returned by the network context
 * @returns translated equivalent SDK supported network
 */
export function translateToNetworkishName(
  appNetwork: SupportedNetworks
): SdkSupportedNetworks | "unsupported" {
  if (typeof appNetwork !== "string") {
    return "unsupported";
  }

  switch (appNetwork) {
    case "base":
      return SdkSupportedNetworks.BASE;
    case "base-goerli":
      return SdkSupportedNetworks.BASE_GOERLI;
    case "ethereum":
      return SdkSupportedNetworks.MAINNET;
    case "goerli":
      return SdkSupportedNetworks.GOERLI;
    case "mumbai":
      return SdkSupportedNetworks.MUMBAI;
    case "polygon":
      return SdkSupportedNetworks.POLYGON;
  }

  return "unsupported";
}
type SubgraphNetworkUrl = Record<SupportedNetworks, string | undefined>;

export const SUBGRAPH_API_URL: SubgraphNetworkUrl = {
  arbitrum: undefined,
  "arbitrum-test": undefined,
  base: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-baseMainnet/api",
  "base-goerli":
    "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-baseGoerli/api",
  ethereum:
    "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mainnet/version/v1.3.0/api",
  goerli:
    "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-goerli/version/v1.3.0/api",
  mumbai:
    "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mumbai/version/v1.3.0/api",
  polygon:
    "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-polygon/version/v1.3.0/api",
  unsupported: undefined,
};

// This file is mostly taken from the Aragon App source code

/* SUPPORTED NETWORK TYPES ================================================== */

export function isSupportedNetwork(
  network: string
): network is SupportedNetworks {
  return SUPPORTED_NETWORKS.some((n) => n === network);
}

/**
 * Get the network chain data with given chain id
 * @param chainId Chain id
 * @returns {ChainData} The chain data of the supported network or undefined if network is unsupported
 */
export function getChainDataByChainId(chainId: number): ChainData | undefined {
  if (isSupportedChainId(chainId)) {
    return Object.entries(CHAIN_METADATA).find(
      (entry) => entry[1].id === chainId
    )?.[1] as ChainData;
  }
}

/* CHAIN DATA =============================================================== */

export type ChainList = Record<SupportedNetworks, ChainData>;

/** Name of the preferred network (e.g. 'polygon' or 'mumbai') */
export const PREFERRED_NETWORK: SupportedNetworks | undefined =
  getSupportedNetworkByChainId(CONFIG.PREFERRED_NETWORK_ID);

/** Chain data of the preferred network */
export const PREFERRED_NETWORK_METADATA =
  CHAIN_METADATA[PREFERRED_NETWORK ?? "goerli"];
