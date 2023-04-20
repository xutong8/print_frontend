import { Modal } from "antd";
import { forwardRef, useState } from "react";
import { useImperativeHandle, ForwardedRef } from "react";
import styles from "./index.module.less";
import { IRawMaterial } from "@/services/fetchRawMaterialById";
import RawMaterialBaseEdit from "../RawMaterialBaseEdit";

export interface IRawMaterialEditProps {}

export interface RawMaterialEditRef {
  setShowModal: (showModal: boolean) => void;
  setRawMaterial: (rawMaterial: RawMaterialType) => void;
}

export type RawMaterialType = IRawMaterial | null;

const RawMaterialEdit = (
  props: IRawMaterialEditProps,
  ref: ForwardedRef<RawMaterialEditRef>
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rawMaterial, setRawMaterial] = useState<RawMaterialType>(null);

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
    setRawMaterial,
  }));

  return (
    <Modal
      title="原料编辑"
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
      width={1000}
      destroyOnClose={true}
    >
      <RawMaterialBaseEdit
        rawMaterial={rawMaterial}
        setRawMaterial={setRawMaterial}
      />
    </Modal>
  );
};

export default forwardRef<RawMaterialEditRef, IRawMaterialEditProps>(
  RawMaterialEdit
);
