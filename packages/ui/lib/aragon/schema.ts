import { DaoSortBy } from "@aragon/sdk-client";
import { SortDirection } from "@aragon/sdk-client-common";
import { z } from "zod";

export const daoInputSchema = z.object({
  daoAddress: z.string(),
  networkId: z.string(),
});

export const daosInputSchema = z.object({
  params: z
    .object({
      skip: z.number().optional(),
      limit: z.number().optional(),
      direction: z.nativeEnum(SortDirection).optional(),
      sortBy: z.nativeEnum(DaoSortBy).optional(),
      where: z
        .object({
          name_contains: z.string().optional(),
          // add other fields as needed
        })
        .optional(),
    })
    .optional(),
  networkId: z.string(),
});

export type DaoInput = z.infer<typeof daoInputSchema>;
export type DaosInput = z.infer<typeof daosInputSchema>;
