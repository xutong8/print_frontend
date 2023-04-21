import { httpRequest } from "@/services";
import { IRawMaterial } from "./fetchRawMaterialById";

const addRawMaterial = async (rawMaterial: IRawMaterial) => {
  return httpRequest.post("/rawMaterial/addRawMaterial", rawMaterial);
};

export { addRawMaterial };
