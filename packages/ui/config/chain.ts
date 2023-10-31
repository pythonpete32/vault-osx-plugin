const CHAIN_METADATA = {
  id: 5,
  name: "Goerli",
  domain: "L1 Blockchain",
  logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  explorer: "https://goerli.etherscan.io/",
  isTestnet: true,
  mainnet: "ethereum",
  rpc: [
    `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
    `wss://goerli.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
  ],
  nativeCurrency: {
    name: "Goerli Ether",
    symbol: "ETH",
    decimals: 18,
  },
  etherscanApi: "https://api-goerli.etherscan.io/api",
  etherscanApiKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
  covalent: {
    networkId: "eth-goerli",
    nativeTokenId: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  },
  alchemyApi: "https://eth-goerli.g.alchemy.com/v2",
  supportsEns: true,
  ipfs: "https://test.ipfs.aragon.network",
  aragonSubgraph:
    "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-goerli/version/v1.3.0/api",
};
export type ChainMetadata = typeof CHAIN_METADATA;
export default CHAIN_METADATA;
