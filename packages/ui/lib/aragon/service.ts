import { getClients } from "@/lib/aragon/aragon";
import { DaoListItem, DaoQueryParams, DaoDetails } from "@aragon/sdk-client";
import { DaoInput, DaosInput } from "./schema";

export async function fetchDao({
  daoAddress,
  networkId,
}: DaoInput): Promise<DaoDetails | null | undefined> {
  const { client } = getClients(networkId);
  if (!client) throw new Error("Client not found");
  return await client.methods.getDao(daoAddress);
}

export async function fetchDaos({
  params,
  networkId,
}: DaosInput): Promise<DaoListItem[] | undefined> {
  const { client } = getClients(networkId);
  if (!client) throw new Error("Client not found");

  return await client?.methods.getDaos(params ?? { limit: 1000 });
}
