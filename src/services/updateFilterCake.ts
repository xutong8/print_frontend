import { httpRequest } from "@/services";
import { IFilterCake } from "./fetchFilterCakeById";
import { AxiosResponse } from "axios";
import { IUpdateResponse } from "./updateMemberInfo";

const updateFilterCake = async (filterCake: IFilterCake) => {
  const res = await httpRequest.put("/filterCake/updateFilterCake", filterCake) as AxiosResponse<IUpdateResponse>;
  if(res.data.code === 301 )
    throw res.data.msg;
  return res;
};

export { updateFilterCake };