import { httpRequest } from "@/services";
import { IProductSeries } from "./fetchProductSeriesById";

const addProductSeries = async (productSeries: IProductSeries) => {
  return httpRequest.put("/productSeries/addProductSeries", productSeries);
};

export { addProductSeries };