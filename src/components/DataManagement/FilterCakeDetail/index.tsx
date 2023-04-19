import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import styles from "./index.module.less";
import { Modal } from "antd";
import { FilterCakeType } from "../FilterCakeEdit";
import FilterCakeBaseDetail from "../FilterCakeBaseDetail";

export interface IFilterCakeDetailProps {}

export interface FilterCakeDetailRef {
  setShowModal: (showModal: boolean) => void;
  setFilterCake: (product: FilterCakeType) => void;
}

const FilterCakeDetail = (
  props: IFilterCakeDetailProps,
  ref: ForwardedRef<FilterCakeDetailRef>
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filterCake, setFilterCake] = useState<FilterCakeType>(null);

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
    setFilterCake,
  }));

  return (
    <Modal
      title="滤饼详情"
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
      width={1000}
      destroyOnClose={true}
    >
      <FilterCakeBaseDetail filterCake={filterCake} />
    </Modal>
  );
};

export default forwardRef<FilterCakeDetailRef, IFilterCakeDetailProps>(
  FilterCakeDetail
);
