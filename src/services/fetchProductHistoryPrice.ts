import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";
import { IHistoryPriceSimple } from "./fetchRawMaterialById";

export interface IQueryProductHistoryPrice {
    productId: number;
    months: number;
}

const fetchProductHistoryPriceById = async (query: IQueryProductHistoryPrice) => {
  const res = (await httpRequest.get(
    "/product/getProductHistoryPriceList",
    {
      params: {
        ...query
      },
    }
  )) as AxiosResponse<IHistoryPriceSimple[]>;
  const historyPrice = (res?.data ?? []) as IHistoryPriceSimple[];
  return historyPrice;
};

export { fetchProductHistoryPriceById };