import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Button, Input, InputNumber, Select, Tag, message } from "antd";
import styles from "./index.module.less";
import TextArea from "antd/es/input/TextArea";
import { PlusCircleTwoTone } from "@ant-design/icons";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { FilterCakeType, RawMaterialType } from "../FilterCakeEdit";
import {
  IFilterCake,
  IFilterCakeSimple,
  IRawMaterialSimple,
} from "@/services/fetchFilterCakeById";

export interface IFilterCakeBaseEditProps {
  filterCake: FilterCakeType;
  setFilterCake: (filterCake: FilterCakeType) => void;
}

export interface FilterCakeBaseEditRef {
  rmRelations: IRawMaterialSimple[];
  setRMRelations: (rmRelations: IRawMaterialSimple[]) => void;
  fcRelations: IFilterCakeSimple[];
  setFCRelations: (fcRelations: IFilterCakeSimple[]) => void;
}

const FilterCakeBaseEdit = (
  props: IFilterCakeBaseEditProps,
  ref: ForwardedRef<FilterCakeBaseEditRef>
) => {
  const { filterCake, setFilterCake } = props;

  // 选中的原料
  const [selectedRawMaterial, setSelectedRawMaterial] =
    useState<RawMaterialType>(null);
  // 选中的滤饼
  const [selectedFilterCake, setSelectedFilterCake] =
    useState<FilterCakeType>(null);
  // 原料投入量
  const [rmAmount, setRMAmount] = useState<number>(0);
  // 原料启用百分比
  const [rmEnable, setRMEnable] = useState<boolean>(false);
  // 滤饼投入量
  const [fcAmount, setFCAmount] = useState<number>(0);
  // 滤饼启用百分比
  const [fcEnable, setFCEnable] = useState<boolean>(false);

  // 原料关联
  const [rmRelations, setRMRelations] = useState<IRawMaterialSimple[]>(
    filterCake?.rawMaterialSimpleList ?? []
  );
  // 滤饼关联
  const [fcRelations, setFCRelations] = useState<IFilterCakeSimple[]>(
    filterCake?.filterCakeSimpleList ?? []
  );

  // 添加原料关联
  const handleRmAdd = () => {
    if (selectedRawMaterial === null || rmAmount <= 0) {
      message.warning("原料关联数据不能为空，新增失败！");
      return;
    }

    const relation = {
      rawMaterialId: selectedRawMaterial?.rawMaterialId ?? 0,
      rawMaterialName: selectedRawMaterial?.rawMaterialName ?? "",
      inventory: rmEnable ? rmAmount / 100 : rmAmount,
    };
    setRMRelations([...rmRelations, relation]);
  };
  // 删除原料关联
  const handleRmDel = (relation: IRawMaterialSimple) => {
    setRMRelations(
      rmRelations.filter((rm) => rm.rawMaterialId !== relation.rawMaterialId)
    );
  };

  // 添加滤饼关联
  const handleFcAdd = () => {
    if (selectedFilterCake === null || fcAmount <= 0) {
      message.warning("滤饼关联数据不能为空，新增失败！");
      return;
    }

    const relation = {
      filterCakeId: selectedFilterCake?.filterCakeId ?? 0,
      filterCakeName: selectedFilterCake?.filterCakeName ?? "",
      inventory: fcEnable ? fcAmount / 100 : fcAmount,
    };
    setFCRelations([...fcRelations, relation]);
  };
  // 删除滤饼关联
  const handleFcDel = (relation: IFilterCakeSimple) => {
    setFCRelations(
      fcRelations.filter((fc) => fc.filterCakeId !== relation.filterCakeId)
    );
  };

  useImperativeHandle(ref, () => ({
    rmRelations,
    setRMRelations,
    fcRelations,
    setFCRelations,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* 滤饼名称 */}
        <div className={styles.base}>
          <p className={styles.field}>滤饼名称：</p>
          <Input
            className={styles.input}
            value={filterCake?.filterCakeName ?? ""}
            onChange={(event) => {
              setFilterCake({
                ...(filterCake ?? ({} as IFilterCake)),
                filterCakeName: event.target.value,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default forwardRef<FilterCakeBaseEditRef, IFilterCakeBaseEditProps>(
  FilterCakeBaseEdit
);
