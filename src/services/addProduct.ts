import { httpRequest } from "@/services";
import { IProduct } from "./fetchProductById";
import { AxiosResponse } from "axios";
import { IUpdateResponse } from "./updateMemberInfo";

const addProduct = async (product: IProduct) => {
  const res =await httpRequest.post("/product/addProduct", product) as AxiosResponse<IUpdateResponse>;
  if(res.data.code === 301 ){
    throw res.data.msg;
  }
  return res;
};

export { addProduct };
