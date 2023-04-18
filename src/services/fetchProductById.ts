import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";

export interface IFilterCakeSimple {
  filterCakeId: number;
  filterCakeName: string;
  inventory: number;
}

export interface IRawMaterialSimple {
  rawMaterialId: number;
  rawMaterialName: string;
  inventory: number;
}

export interface IProduct {
  productId: string;
  productName: string;
  productIndex: string;
  productCode: string;
  productColor: string;
  productUnitPrice: number;
  productPriceIncreasePercent: number;
  productSeriesName: string;
  productFactoryName: string;
  productRemarks: string;
  productProcessingCost: string;
  productAccountingQuantity: string;
  filterCakeSimpleList: IFilterCakeSimple[];
  rawMaterialSimpleList: IRawMaterialSimple[];
}

const fetchProductById = async (productId: string) => {
  const res = (await httpRequest.get("/product/findProductByProductId", {
    params: {
      productId,
    },
  })) as AxiosResponse<IProduct>;
  const product = (res?.data ?? {}) as IProduct;
  return product;
};

export { fetchProductById };
