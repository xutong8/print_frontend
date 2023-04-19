import React, { useState } from "react";
import styles from "./index.module.less";
import { FilterCakeType } from "../FilterCakeEdit";
import { unitPriceFormat } from "@/utils";
import { Button, Group, RadioChangeEvent } from "antd/es/radio";
import { Table } from "antd";
import { IFilterCakeSimple } from "@/services/fetchFilterCakeById";
import { IRawMaterialSimple } from "@/services/fetchProductById";

export interface IFilterCakeBaseDetailProps {
  filterCake: FilterCakeType;
}

const RELATION_DETAIL = "关联信息";
const HISTORY_PRICE = "历史价格";

// 滤饼关联表columns
const fcRelationColumns = [
  {
    title: "滤饼序号",
    dataIndex: "filterCakeId",
    key: "filterCakeId",
  },
  {
    title: "滤饼名称",
    dataIndex: "filterCakeName",
    key: "filterCakeName",
  },
  {
    title: "投料量",
    dataIndex: "inventory",
    key: "inventory",
  },
];

// 原料关联表columns
const rmRelationColumns = [
  {
    title: "原料序号",
    dataIndex: "rawMaterialId",
    key: "rawMaterialId",
  },
  {
    title: "原料名称",
    dataIndex: "rawMaterialName",
    key: "rawMaterialName",
  },
  {
    title: "投入量",
    dataIndex: "inventory",
    key: "inventory",
  },
];

const FilterCakeBaseDetail: React.FC<IFilterCakeBaseDetailProps> = (props) => {
  const { filterCake } = props;

  // 选项列表
  const options = [RELATION_DETAIL, HISTORY_PRICE];
  // 选中的选项
  const [selectedOption, setSelectedOption] = useState<string>(RELATION_DETAIL);

  const renderOption = (option: string) => {
    switch (option) {
      case RELATION_DETAIL: {
        return (
          <div className={styles.relation}>
            <Table
              columns={fcRelationColumns}
              dataSource={filterCake?.filterCakeSimpleList ?? []}
              rowKey={(record: IFilterCakeSimple) => record.filterCakeId}
            />
            <Table
              columns={rmRelationColumns}
              dataSource={filterCake?.rawMaterialSimpleList ?? []}
              rowKey={(record: IRawMaterialSimple) => record.rawMaterialId}
            />
          </div>
        );
      }
      case HISTORY_PRICE: {
        // TODO: 添加历史价格逻辑
        return null;
      }
      default: {
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* 滤饼名称 */}
        <div className={styles.base}>
          <p className={styles.field}>滤饼名称：</p>
          <p className={styles.value}>{filterCake?.filterCakeName ?? ""}</p>
        </div>
        {/* 滤饼编号 */}
        <div className={styles.base}>
          <p className={styles.field}>滤饼编号：</p>
          <p className={styles.value}>{filterCake?.filterCakeIndex ?? ""}</p>
        </div>
        {/* 滤饼颜色 */}
        <div className={styles.base}>
          <p className={styles.field}>滤饼颜色：</p>
          <p className={styles.value}>{filterCake?.filterCakeColor ?? ""}</p>
        </div>
        {/* 核算数量 */}
        <div className={styles.base}>
          <p className={styles.field}>核算数量：</p>
          <p className={styles.value}>
            {filterCake?.filterCakeAccountingQuantity ?? 0}
          </p>
        </div>
        {/* 加工成本 */}
        <div className={styles.base}>
          <p className={styles.field}>加工成本：</p>
          <p className={styles.value}>
            {unitPriceFormat(Number(filterCake?.filterCakeProcessingCost ?? 0))}
          </p>
        </div>
        {/* 附加信息 */}
        <div className={styles.base}>
          <p className={styles.field}>附加信息：</p>
          <p className={styles.value}>{filterCake?.filterCakeRemarks ?? ""}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.options}>
          <Group
            value={selectedOption}
            onChange={(event: RadioChangeEvent) =>
              setSelectedOption(event.target.value)
            }
          >
            {options.map((option) => (
              <Button value={option} key={option}>
                {option}
              </Button>
            ))}
          </Group>
        </div>
        {renderOption(selectedOption)}
      </div>
    </div>
  );
};

export default FilterCakeBaseDetail;
