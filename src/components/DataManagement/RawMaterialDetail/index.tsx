import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import styles from "./index.module.less";
import { Modal } from "antd";
import { RawMaterialType } from "../RawMaterialEdit";
import RawMaterialBaseDetail from "../RawMaterialBaseDetail";

export interface IRawMaterialDetailProps {}

export interface RawMaterialDetailRef {
  setShowModal: (showModal: boolean) => void;
  setRawMaterial: (rawMaterial: RawMaterialType) => void;
}

const RawMaterialDetail = (
  props: IRawMaterialDetailProps,
  ref: ForwardedRef<RawMaterialDetailRef>
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rawMaterial, setRawMaterial] = useState<RawMaterialType>(null);

  // 点击确认
  const handleOk = () => {
    setShowModal(false);
  };

  // 点击取消
  const handleCancel = () => {
    setShowModal(false);
  };

  useImperativeHandle(ref, () => ({
    setShowModal,
    setRawMaterial,
  }));

  return (
    <Modal
      title="原料详情"
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
      width={1000}
      destroyOnClose={true}
    >
      <RawMaterialBaseDetail rawMaterial={rawMaterial} />
    </Modal>
  );
};

export default forwardRef<RawMaterialDetailRef, IRawMaterialDetailProps>(
  RawMaterialDetail
);
