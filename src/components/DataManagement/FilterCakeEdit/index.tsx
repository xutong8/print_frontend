import { Modal } from "antd";
import React, { forwardRef, useState } from "react";
import { useImperativeHandle, ForwardedRef } from "react";
import styles from "./index.module.less";
import { IFilterCake } from "@/services/fetchFilterCakeById";
import FilterCakeBaseEdit from "../FilterCakeBaseEdit";
import { IRawMaterial } from "@/services/fetchRawMaterials";

export interface IFilterCakeEditProps {}

export interface FilterCakeEditRef {
  setShowModal: (showModal: boolean) => void;
  setFilterCake: (filterCake: FilterCakeType) => void;
}

export type FilterCakeType = IFilterCake | null;
export type RawMaterialType = IRawMaterial | null;

const FilterCakeEdit = (
  props: IFilterCakeEditProps,
  ref: ForwardedRef<FilterCakeEditRef>
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filterCake, setFilterCake] = useState<FilterCakeType>(null);

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
    setFilterCake,
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
      <FilterCakeBaseEdit
        filterCake={filterCake}
        setFilterCake={setFilterCake}
      />
    </Modal>
  );
};

export default forwardRef<FilterCakeEditRef, IFilterCakeEditProps>(
  FilterCakeEdit
);
