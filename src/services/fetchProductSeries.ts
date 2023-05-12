import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";

export interface IProductSeriesName {
  id: number;
  name: string;
}

const fetchAllProductSeries = async () => {
  const res = (await httpRequest.get(
    "/productSeries/findAllProductSeriesName"
  )) as AxiosResponse<IProductSeriesName[]>;
  const productSeries = (res?.data ?? []) as IProductSeriesName[];
  return productSeries;
};

export { fetchAllProductSeries };
