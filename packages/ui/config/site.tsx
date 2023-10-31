import { Address } from "viem";

const siteConfig = {
  title: "Aragon Vaults",
  description: "Aragon Vaults",
  url: "https://vaults.daobox.app",
  twitter: "@dao_box",
  dao: {
    name: "BitConneeeeeeeeeect",
    ensDomain: "bitconnect.dao.eth",
    vaultAddress: "0x885fd4b7C0B9b7AaC73219493aEB6fd874658E76" as Address,
    assetAddress: "0x14c5c0AC2bac25D9e6724A5De9b3189Cd1F34404" as Address,
    daoAddress: "0xCe780Fea1c950a29769b4F10817a9c51154D12AF",
    daoUrl: "https://app.aragon.org/#/daos/goerli/bitconnect.dao.eth/dashboard",
  },
};

export type SiteConfig = typeof siteConfig;
export default siteConfig;
