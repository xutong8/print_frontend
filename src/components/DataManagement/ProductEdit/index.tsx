import { IProduct } from "@/services/fetchProductById";
import { Modal } from "antd";
import React, { forwardRef, useState } from "react";
import { useImperativeHandle, ForwardedRef } from "react";
import styles from "./index.module.less";
import { IProductSeries } from "@/services/fetchProductSeries";
import { IRawMaterial } from "@/services/fetchRawMaterials";
import { IFilterCake } from "@/services/fetchFilterCakes";
import ProductBaseEdit from "../ProductBaseEdit";

export interface IProductEditProps {}

export interface ProductEditRef {
  setShowModal: (showModal: boolean) => void;
  setProduct: (product: ProductType) => void;
  setSeries: (series: IProductSeries[]) => void;
  setRawMaterials: (rawMaterials: IRawMaterial[]) => void;
  setFilterCakes: (filterCakes: IFilterCake[]) => void;
}

export type ProductType = IProduct | null;
export type RawMaterialType = IRawMaterial | null;
export type FilterCakeType = IFilterCake | null;

const ProductEdit = (
  props: IProductEditProps,
  ref: ForwardedRef<ProductEditRef>
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>(null);
  // 产品系列
  const [series, setSeries] = useState<IProductSeries[]>([]);
  // 原料名称
  const [rawMaterials, setRawMaterials] = useState<IRawMaterial[]>([]);
  // 滤饼名称
  const [filterCakes, setFilterCakes] = useState<IFilterCake[]>([]);

  // 点击确认
  const handleOk = () => {
    setShowModal(false);
    // TODO：添加修改产品的逻辑
  };

  // 点击取消
  const handleCancel = () => {
    setShowModal(false);
  };

  useImperativeHandle(ref, () => ({
    setShowModal,
    setProduct,
    setSeries,
    setRawMaterials,
    setFilterCakes,
  }));

  return (
    <Modal
      title="产品编辑"
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
      width={1000}
      destroyOnClose={true}
    >
      <ProductBaseEdit
        product={product}
        setProduct={setProduct}
        series={series}
        rawMaterials={rawMaterials}
        filterCakes={filterCakes}
      />
    </Modal>
  );
};

export default forwardRef<ProductEditRef, IProductEditProps>(ProductEdit);
