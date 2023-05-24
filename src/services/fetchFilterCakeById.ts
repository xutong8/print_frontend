import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";

export interface IFilterCakeSimple {
  filterCakeId: number;
  filterCakeName: string;
  inventory: number;
}

export interface IRawMaterialSimple {
  rawMaterialId: number;
  rawMaterialName: string;
  inventory: number;
}

export interface IHistoryPriceSimple {
  historyPriceId?: number;
  historyPriceDate: string;
  value: number;
}

export interface IFilterCake {
  filterCakeId: number;
  filterCakeName: string;
  filterCakeIndex: string;
  filterCakeCode: string;
  filterCakeColor: string;
  filterCakeUnitPrice: number;
  filterCakePriceIncreasePercent: number;
  filterCakeSpecification:string;
  filterCakeRemarks: string;
  filterCakeProcessingCost: number;
  filterCakeAccountingQuantity: number;
  filterCakeSimpleList: IFilterCakeSimple[];
  rawMaterialSimpleList: IRawMaterialSimple[];
}

const fetchFilterCakeById = async (filterCakeId: string) => {
  const res = (await httpRequest.get(
    "/filterCake/findFilterCakeByFilterCakeId",
    {
      params: {
        filterCakeId,
      },
    }
  )) as AxiosResponse<IFilterCake>;
  const product = (res?.data ?? {}) as IFilterCake;
  return product;
};

export { fetchFilterCakeById };
