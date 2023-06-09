import { IProduct } from "@/services/fetchProductById";
import { Modal, message } from "antd";
import React, { forwardRef, useRef, useState } from "react";
import { useImperativeHandle, ForwardedRef } from "react";
import styles from "./index.module.less";
import { IProductSeriesName } from "@/services/fetchProductSeries";
import { IRawMaterialName } from "@/services/fetchRawMaterials";
import { IFilterCakeName } from "@/services/fetchFilterCakes";
import ProductBaseEdit, { ProductBaseEditRef } from "../ProductBaseEdit";
import { checkPermission } from "@/utils";
import { MANAGER } from "@/constants/data-management";
import { updateProduct } from "@/services/updateProduct";
import { IProductName } from "@/services/fetchProductNames";

export interface IProductEditProps {
  setForceUpdate: (forceUpdate: {}) => void;
}

export interface ProductEditRef {
  setShowModal: (showModal: boolean) => void;
  setProduct: (product: ProductType) => void;
  setSeries: (series: IProductSeriesName[]) => void;
  setRawMaterials: (rawMaterials: IRawMaterialName[]) => void;
  setFilterCakes: (filterCakes: IFilterCakeName[]) => void;
  setProducts: (products: IProductName[]) => void;
}

export type ProductType = IProduct | null;
export type RawMaterialNameType = IRawMaterialName | null;
export type FilterCakeNameType = IFilterCakeName | null;
export type ProductNameType = IProductName | null;

const ProductEdit = (
  props: IProductEditProps,
  ref: ForwardedRef<ProductEditRef>
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>(null);
  // 产品系列
  const [series, setSeries] = useState<IProductSeriesName[]>([]);
  // 原料名称
  const [rawMaterials, setRawMaterials] = useState<IRawMaterialName[]>([]);
  // 滤饼名称
  const [filterCakes, setFilterCakes] = useState<IFilterCakeName[]>([]);
  // 滤饼名称
  const [products, setProducts] = useState<IProductName[]>([]);


  const baseEditRef = useRef<ProductBaseEditRef>(null);
  // 点击确认
  const handleOk = async () => {
    setShowModal(false);
    // TODO：添加修改产品的逻辑
    if (product === null) {
      message.warning("产品对象不能为空");
      return;
    }
    try {
      await updateProduct({
        ...(product as IProduct),
        rawMaterialSimpleList: baseEditRef.current?.rmRelations ?? [],
        filterCakeSimpleList: baseEditRef.current?.fcRelations ?? [],
        productSimpleList: baseEditRef.current?.pdRelations ?? [],
      });
      message.success("更新对象成功！");
      props.setForceUpdate({});
    } catch (err) {
      message.error(err as string + ", 更新对象失败！");
    }
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
    setProducts,
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
        products={products}
        ref={baseEditRef}
      />
    </Modal>
  );
};

export default forwardRef<ProductEditRef, IProductEditProps>(ProductEdit);
