import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";
import { IHistoryPriceSimple } from "./fetchRawMaterialById";

export interface IQueryFCakeHistoryPrice {
    filterCakeId: number;
    months: number;
}

const fetchFCakeHistoryPriceById = async (query: IQueryFCakeHistoryPrice) => {
  const res = (await httpRequest.get(
    "/filterCake/getFilterCakeHistoryPriceList",
    {
      params: {
        ...query
      },
    }
  )) as AxiosResponse<IHistoryPriceSimple[]>;
  const historyPrice = (res?.data ?? []) as IHistoryPriceSimple[];
  return historyPrice;
};

export { fetchFCakeHistoryPriceById };
