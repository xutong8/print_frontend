import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";

export interface IProductSimple {
  productId: number;
  productName: string;
}

export interface IProductSeries {
  productSeriesId: number;
  productSeriesName: string;
  productSeriesFunction: string;
  productSimpleList: IProductSimple[];
}

const fetchProductSeriesById = async (productSeriesId: string) => {
  const res = (await httpRequest.get(
    "/productSeries/findProductSeriesByProductSeriesId",
    {
      params: {
        productSeriesId,
      },
    }
  )) as AxiosResponse<IProductSeries>;
  const product = (res?.data ?? {}) as IProductSeries;
  return product;
};

export { fetchProductSeriesById };
