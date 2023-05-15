import { httpRequest } from "@/services";
import { IProductSeries } from "./fetchProductSeriesById";

const updateProductSeries = async (productSeries: IProductSeries) => {
  return httpRequest.put("/productSeries/updateProductSeries", productSeries);
};

export { updateProductSeries };