import { httpRequest } from "@/services";
import { IProduct } from "./fetchProductById";

const addProduct = async (product: IProduct) => {
  return httpRequest.post("/product/addProduct", product);
};

export { addProduct };
