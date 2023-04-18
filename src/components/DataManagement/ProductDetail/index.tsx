import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import styles from "./index.module.less";
import { Modal } from "antd";
import { ProductType } from "../ProductEdit";
import ProductBaseDetail from "../ProductBaseDetail";

export interface IProductDetailProps {}

export interface ProductDetailRef {
  setShowModal: (showModal: boolean) => void;
  setProduct: (product: ProductType) => void;
}

const ProductDetail = (
  props: IProductDetailProps,
  ref: ForwardedRef<ProductDetailRef>
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>(null);

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
  }));

  return (
    <Modal
      title="产品详情"
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
      width={1000}
      destroyOnClose={true}
    >
      <ProductBaseDetail product={product} />
    </Modal>
  );
};

export default forwardRef<ProductDetailRef, IProductDetailProps>(ProductDetail);
