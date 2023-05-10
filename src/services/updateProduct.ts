import { httpRequest } from "@/services";
import { IProduct } from "./fetchProductById";

const updateProduct = async (product: IProduct) => {
  return httpRequest.put("/product/updateProduct", product);
};

export { updateProduct };