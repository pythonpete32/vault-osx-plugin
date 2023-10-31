import { ponder } from "@/generated";

import { decodeAbiParameters, parseAbiParameters } from "viem";

const match = (s1: string, s2: string): boolean => s1.toLowerCase() === s2.toLowerCase();

ponder.on(
  "PluginSetupProcessor:InstallationPrepared",
  async ({ event, context }) => {
    const { Dao, Installation } = context.entities
    const { preparedSetupId, dao, pluginSetupRepo, sender, data, plugin } = event.params
    const VAULT_REPO = context.contracts.VaultRepo.address

    // only process if the pluginSetupRepo is the VaultRepo
    if (!match(pluginSetupRepo, VAULT_REPO)) return

    // create a DAO if it doesn't exist
    const DAO = await Dao.upsert({ id: dao })

    // create an Installation
    const install = await Installation.create({
      id: preparedSetupId,
      data: { dao: DAO.id, pluginSetupRepo, sender, data, plugin, preparedSetupId }
    })

    console.log("Vault installation prepared: ", install);
  }
);

ponder.on(
  "PluginSetupProcessor:InstallationApplied",
  async ({ event, context }) => {
    const { Vault, Installation } = context.entities
    const { preparedSetupId } = event.params

    // only process if the pluginSetupRepo is the VaultRepo
    const installation = await Installation.findUnique({ id: preparedSetupId })
    if (!installation) return;

    // decode the asset address from the data field
    const assetAddress = decodeAbiParameters(
      parseAbiParameters('address asset'),
      installation.data as `0x${string}`
    )[0]

    // create a Vault
    const VAULT = await Vault.create({
      id: assetAddress,
      data: {
        dao: installation.dao,
        asset: assetAddress
      }
    })
    console.log("VAULT: ", VAULT);
  }
);


