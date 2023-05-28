import { httpRequest } from "@/services";
import { IFilterCake } from "./fetchFilterCakeById";
import { AxiosResponse } from "axios";
import { IUpdateResponse } from "./updateMemberInfo";

const addFilterCake = async (filterCake: IFilterCake) => {
  const res =await httpRequest.post("/filterCake/addFilterCake", filterCake) as AxiosResponse<IUpdateResponse>;
  if(res.data.code === 301 ){
    throw res.data.msg;
  }
  return res;
};

export { addFilterCake };
