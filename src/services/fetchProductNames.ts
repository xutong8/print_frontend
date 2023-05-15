import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";

export interface IProductName {
  id: number;
  name: string;
}

const fetchProductNames = async () => {
  const res = (await httpRequest.get(
    "/product/findAllProductName"
  )) as AxiosResponse<IProductName[]>;
  const productNames = (res?.data ?? []) as IProductName[];
  return productNames;
};

export { fetchProductNames };