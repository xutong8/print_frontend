import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";

export interface IHistoryPriceSimple {
  historyPriceId?: number;
  historyPriceDate: string;
  value: number;
}

export interface IRawMaterial {
  rawMaterialId: number;
  rawMaterialName: string;
  rawMaterialIndex: string;
  rawMaterialUnitPrice: number;
  rawMaterialIncreasePercent: number;
  rawMaterialConventional: string;
  rawMaterialSpecification: string;
  historyPriceSimpleList: IHistoryPriceSimple[];
}

const fetchRawMaterialById = async (rawMaterialId: string) => {
  const res = (await httpRequest.get(
    "/rawMaterial/findRawMaterialByRawMaterialId",
    {
      params: {
        rawMaterialId,
      },
    }
  )) as AxiosResponse<IRawMaterial>;
  const product = (res?.data ?? {}) as IRawMaterial;
  return product;
};

export { fetchRawMaterialById };
