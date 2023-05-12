import { Modal, message } from "antd";
import { forwardRef, useRef, useState } from "react";
import { useImperativeHandle, ForwardedRef } from "react";
import styles from "./index.module.less";
import { IRawMaterial } from "@/services/fetchRawMaterialById";
import RawMaterialBaseEdit, { RawMaterialBaseEditRef } from "../RawMaterialBaseEdit";
import { updateRawMaterial } from "@/services/updateRawMaterial";

export interface IRawMaterialEditProps { }

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


  const baseEditRef = useRef<RawMaterialBaseEditRef>(null);
  // 点击确认
  const handleOk = async () => {
    setShowModal(false);
    // TODO：添加修改产品的逻辑
    if (rawMaterial === null) {
      message.warning("原料对象不能为空");
      return;
    }
    try {
      console.log("updateRawMaterial: ", {
        ...(rawMaterial as IRawMaterial),
        rawMaterialHistoryPrice: baseEditRef.current?.hpRelations ?? [],
      })
      await updateRawMaterial({
        ...(rawMaterial as IRawMaterial),
        rawMaterialHistoryPrice: baseEditRef.current?.hpRelations ?? [],
      });
      message.info("新建对象成功！");
    } catch (err) {
      message.error("新建对象失败！");
    }
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
        ref={baseEditRef}
      />
    </Modal>
  );
};

export default forwardRef<RawMaterialEditRef, IRawMaterialEditProps>(
  RawMaterialEdit
);
