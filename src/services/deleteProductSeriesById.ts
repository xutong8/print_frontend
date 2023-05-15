import { httpRequest } from "@/services";

const deleteProductSeriesById = (productSeriesId: string) => {
  return httpRequest.delete("/productSeries/deleteByProductSeriesId", {
    params: {
      productSeriesId,
    },
  });
};

export { deleteProductSeriesById };
