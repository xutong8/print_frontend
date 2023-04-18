import { IProduct } from "@/services/fetchProductById";
import { Input, Modal, Select } from "antd";
import React, { forwardRef, useState } from "react";
import { useImperativeHandle, ForwardedRef } from "react";
import styles from "./index.module.less";
import { IProductSeries } from "@/services/fetchProductSeries";
import TextArea from "antd/es/input/TextArea";
import Header from "@/components/Header";

export interface IProductEditProps {}

export interface ProductEditRef {
  setShowModal: (showModal: boolean) => void;
  setProduct: (product: ProductType) => void;
  setSeries: (series: IProductSeries[]) => void;
}

export type ProductType = IProduct | null;

const ProductEdit = (
  props: IProductEditProps,
  ref: ForwardedRef<ProductEditRef>
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

  const [series, setSeries] = useState<IProductSeries[]>([]);

  useImperativeHandle(ref, () => ({
    setShowModal,
    setProduct,
    setSeries,
  }));

  return (
    <Modal
      title="产品编辑"
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
    >
      <div className={styles.container}>
        <div className={styles.left}>
          {/* 产品名称 */}
          <div className={styles.base}>
            <p className={styles.field}>产品名称：</p>
            <Input
              className={styles.input}
              value={product?.productName ?? ""}
              onChange={(event) => {
                setProduct({
                  ...(product ?? ({} as IProduct)),
                  productName: event.target.value,
                });
              }}
            />
          </div>
          {/* 产品编号 */}
          <div className={styles.base}>
            <p className={styles.field}>产品编号：</p>
            <Input
              className={styles.input}
              value={product?.productIndex ?? ""}
              onChange={(event) => {
                setProduct({
                  ...(product ?? ({} as IProduct)),
                  productIndex: event.target.value,
                });
              }}
            />
          </div>
          {/* 产品代码 */}
          <div className={styles.base}>
            <p className={styles.field}>产品代码：</p>
            <Input
              className={styles.input}
              value={product?.productCode ?? ""}
              onChange={(event) => {
                setProduct({
                  ...(product ?? ({} as IProduct)),
                  productCode: event.target.value,
                });
              }}
            />
          </div>
          {/* 产品系列 */}
          <div className={styles.base}>
            <p className={styles.field}>产品系列：</p>
            <Select
              className={styles.input}
              value={product?.productSeriesName ?? ""}
              options={series.map((item) => ({
                value: item.productSeriesName,
                label: item.productSeriesName,
              }))}
            />
          </div>
          {/* 产品颜色 */}
          <div className={styles.base}>
            <p className={styles.field}>产品颜色：</p>
            <Input
              className={styles.input}
              value={product?.productColor ?? ""}
              onChange={(event) => {
                setProduct({
                  ...(product ?? ({} as IProduct)),
                  productColor: event.target.value,
                });
              }}
            />
          </div>
          {/* TODO: 加工成本 */}
          <div className={styles.base}>
            <p className={styles.field}>加工成本：</p>
            <Input className={styles.input} defaultValue={0} />
          </div>
          {/* TODO: 核算数量 */}
          <div className={styles.base}>
            <p className={styles.field}>核算数量：</p>
            <Input className={styles.input} defaultValue={0} />
          </div>
          {/* TODO: 附加信息 */}
          <div className={styles.base}>
            <p className={styles.field}>附加信息：</p>
            <TextArea
              className={styles.input}
              defaultValue={"请输入附加信息"}
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rm_relations}>
            <Header desc="原料关联" />
          </div>
          <div className={styles.fc_relations}></div>
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef<ProductEditRef, IProductEditProps>(ProductEdit);
