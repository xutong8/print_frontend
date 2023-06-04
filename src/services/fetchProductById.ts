import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";

export interface IProductSimple {
  productId: number;
  productName: string;
  inventory: number;
}

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
  productId: number;
  productName: string;
  productIndex: string;
  productCode: string;
  productColor: string;
  productUnitPrice: number;
  productPriceIncreasePercent: number;
  productSeriesName: string;
  productFactoryName: string;
  productRemarks: string;
  productProcessingCost: number;
  productAccountingQuantity: number;
  filterCakeSimpleList: IFilterCakeSimple[];
  rawMaterialSimpleList: IRawMaterialSimple[];
  productSimpleList: IProductSimple[];
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
