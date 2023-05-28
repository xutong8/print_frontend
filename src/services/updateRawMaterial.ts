import { httpRequest } from "@/services";
import { IRawMaterial } from "./fetchRawMaterialById";
import { AxiosResponse } from "axios";
import { IUpdateResponse } from "./updateMemberInfo";

const updateRawMaterial = async (rawMaterial: IRawMaterial) => {
  const res = await httpRequest.put("/rawMaterial/updateRawMaterial", rawMaterial) as AxiosResponse<IUpdateResponse>;
  if(res.data.code === 301 )
    throw res.data.msg;
  return res;
};

export { updateRawMaterial };
