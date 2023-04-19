import { Modal } from "antd";
import React, { forwardRef, useState } from "react";
import { useImperativeHandle, ForwardedRef } from "react";
import styles from "./index.module.less";
import { IFilterCake } from "@/services/fetchFilterCakeById";
import FilterCakeBaseEdit from "../FilterCakeBaseEdit";
import { IRawMaterialName } from "@/services/fetchRawMaterials";
import { IFilterCakeName } from "@/services/fetchFilterCakes";

export interface IFilterCakeEditProps {}

export interface FilterCakeEditRef {
  setShowModal: (showModal: boolean) => void;
  setFilterCake: (filterCake: FilterCakeType) => void;
  setRawMaterials: (rawMaterials: IRawMaterialName[]) => void;
  setFilterCakes: (filterCakes: IFilterCakeName[]) => void;
}

export type FilterCakeType = IFilterCake | null;
export type FilterCakeNameType = IFilterCakeName | null;
export type RawMaterialNameType = IRawMaterialName | null;

const FilterCakeEdit = (
  props: IFilterCakeEditProps,
  ref: ForwardedRef<FilterCakeEditRef>
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filterCake, setFilterCake] = useState<FilterCakeType>(null);
  // 原料名称
  const [rawMaterials, setRawMaterials] = useState<IRawMaterialName[]>([]);
  // 滤饼名称
  const [filterCakes, setFilterCakes] = useState<IFilterCakeName[]>([]);

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
      <FilterCakeBaseEdit
        filterCake={filterCake}
        setFilterCake={setFilterCake}
        rawMaterials={rawMaterials}
        filterCakes={filterCakes}
      />
    </Modal>
  );
};

export default forwardRef<FilterCakeEditRef, IFilterCakeEditProps>(
  FilterCakeEdit
);
