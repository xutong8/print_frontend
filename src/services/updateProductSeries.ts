import { httpRequest } from "@/services";
import { IProductSeries } from "./fetchProductSeriesById";
import { AxiosResponse } from "axios";
import { IUpdateResponse } from "./updateMemberInfo";

const updateProductSeries = async (productSeries: IProductSeries) => {
  const res = await httpRequest.put("/productSeries/updateProductSeries", productSeries) as AxiosResponse<IUpdateResponse>;
  if(res.data.code === 301 )
    throw res.data.msg;
  return res;
};

export { updateProductSeries };