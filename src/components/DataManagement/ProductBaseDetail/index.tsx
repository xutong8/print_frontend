import React, { useState } from "react";
import styles from "./index.module.less";
import { ProductType } from "../ProductEdit";
import { unitPriceFormat } from "@/utils";
import { Button, Group, RadioChangeEvent } from "antd/es/radio";
import { Table } from "antd";

export interface IProductBaseDetailProps {
  product: ProductType;
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

const ProductBaseDetail: React.FC<IProductBaseDetailProps> = (props) => {
  const { product } = props;

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
              dataSource={product?.filterCakeSimpleList ?? []}
              rowKey={(record) => record.filterCakeId}
            />
            <Table
              columns={rmRelationColumns}
              dataSource={product?.rawMaterialSimpleList ?? []}
              rowKey={(record) => record.rawMaterialId}
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
        {/* 产品名称 */}
        <div className={styles.base}>
          <p className={styles.field}>产品名称：</p>
          <p className={styles.value}>{product?.productName ?? ""}</p>
        </div>
        {/* 产品编号 */}
        <div className={styles.base}>
          <p className={styles.field}>产品编号：</p>
          <p className={styles.value}>{product?.productIndex ?? ""}</p>
        </div>
        {/* 产品系列 */}
        <div className={styles.base}>
          <p className={styles.field}>产品系列：</p>
          <p className={styles.value}>{product?.productSeriesName ?? ""}</p>
        </div>
        {/* 加工成本 */}
        <div className={styles.base}>
          <p className={styles.field}>加工成本：</p>
          <p className={styles.value}>
            {unitPriceFormat(Number(product?.productProcessingCost ?? 0))}
          </p>
        </div>
        {/* 核算数量 */}
        <div className={styles.base}>
          <p className={styles.field}>核算数量：</p>
          <p className={styles.value}>
            {product?.productAccountingQuantity ?? 0}
          </p>
        </div>
        {/* 单位成本 */}
        <div className={styles.base}>
          <p className={styles.field}>单位成本：</p>
          <p className={styles.value}>
            {unitPriceFormat(Number(product?.productUnitPrice ?? 0))}
          </p>
        </div>
        {/* 附加信息 */}
        <div className={styles.base}>
          <p className={styles.field}>附加信息：</p>
          <p className={styles.value}>{product?.productRemarks ?? ""}</p>
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

export default ProductBaseDetail;
