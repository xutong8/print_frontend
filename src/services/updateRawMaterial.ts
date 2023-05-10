import { httpRequest } from "@/services";
import { IRawMaterial } from "./fetchRawMaterialById";

const updateRawMaterial = async (rawMaterial: IRawMaterial) => {
  return httpRequest.put("/rawMaterial/updateRawMaterial", rawMaterial);
};

export { updateRawMaterial };
