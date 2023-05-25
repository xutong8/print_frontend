import { httpRequest } from "@/services";
import { IProduct } from "./fetchProductById";
import { AxiosResponse } from "axios";
import { IUpdateResponse } from "./updateMemberInfo";

const updateProduct = async (product: IProduct) => {
  const res = await httpRequest.put("/product/updateProduct", product) as AxiosResponse<IUpdateResponse>;
  if(res.data.code === 201 )
    throw res.data.msg;
  return res;
};

export { updateProduct };