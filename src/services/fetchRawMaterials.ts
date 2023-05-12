import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";

export interface IRawMaterialName {
  id: number;
  name: string;
}

const fetchAllRawMaterials = async () => {
  const res = (await httpRequest.get(
    "/rawMaterial/findAllRawMaterialName"
  )) as AxiosResponse<IRawMaterialName[]>;
  const rawMaterials = (res?.data ?? []) as IRawMaterialName[];
  return rawMaterials;
};

export { fetchAllRawMaterials };
