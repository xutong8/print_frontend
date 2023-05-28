import { httpRequest } from "@/services";
import { IProductSeries } from "./fetchProductSeriesById";
import { AxiosResponse } from "axios";
import { IUpdateResponse } from "./updateMemberInfo";

const addProductSeries = async (productSeries: IProductSeries) => {
  const res =await httpRequest.post("/productSeries/addProductSeries", productSeries) as AxiosResponse<IUpdateResponse>;
  if(res.data.code === 301 ){
    throw res.data.msg;
  }
  return res;
};

export { addProductSeries };