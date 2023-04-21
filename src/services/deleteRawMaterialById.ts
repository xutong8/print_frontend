import { httpRequest } from "@/services";

const deleteRawMaterialById = (rawMaterialId: string) => {
  return httpRequest.delete("/rawMaterial/deleteByRawMaterialId", {
    params: {
      rawMaterialId,
    },
  });
};

export { deleteRawMaterialById };
