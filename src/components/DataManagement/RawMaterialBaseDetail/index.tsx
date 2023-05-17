import React, { useState } from "react";
import styles from "./index.module.less";
import { unitPriceFormat } from "@/utils";
import { Button, Group, RadioChangeEvent } from "antd/es/radio";
import { RawMaterialType } from "../RawMaterialEdit";
import HistoryBasePrice from "@/components/Echarts/BasicLineChart";
import { IHistoryPriceSimple } from "@/services/fetchRawMaterialById";

export interface IRawMaterialBaseDetailProps {
  rawMaterial: RawMaterialType;
}

const HISTORY_PRICE = "历史价格";

const RawMaterialBaseDetail: React.FC<IRawMaterialBaseDetailProps> = (
  props
) => {
  const { rawMaterial } = props;

  // 选项列表
  const options = [HISTORY_PRICE];
  // 选中的选项
  const [selectedOption, setSelectedOption] = useState<string>(HISTORY_PRICE);

  const renderOption = (option: string) => {
    // TODO: 添加历史价格逻辑
    console.log("rawM history price: ", rawMaterial?.rawMaterialHistoryPrice.map((item: IHistoryPriceSimple) => {
      return item.date;
    }));
    const datax = rawMaterial?.rawMaterialHistoryPrice.map((item: IHistoryPriceSimple) => item.date);
    const dataSeries = rawMaterial?.rawMaterialHistoryPrice.map((item: IHistoryPriceSimple) => item.price);
    return <HistoryBasePrice
      datax={datax as string[]}
      dataSeries={dataSeries as number[]}
    ></HistoryBasePrice>
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* 原料名称 */}
        <div className={styles.base}>
          <p className={styles.field}>原料名称：</p>
          <p className={styles.value}>{rawMaterial?.rawMaterialName ?? ""}</p>
        </div>
        {/* 原料编号 */}
        <div className={styles.base}>
          <p className={styles.field}>原料编号：</p>
          <p className={styles.value}>{rawMaterial?.rawMaterialIndex ?? ""}</p>
        </div>
        {/* 常规原料 */}
        <div className={styles.base}>
          <p className={styles.field}>常规原料：</p>
          <p className={styles.value}>
            {rawMaterial?.rawMaterialConventional ?? ""}
          </p>
        </div>
        {/* 原料规格 */}
        <div className={styles.base}>
          <p className={styles.field}>原料规格：</p>
          <p className={styles.value}>
            {rawMaterial?.rawMaterialSpecification ?? ""}
          </p>
        </div>
        {/* 原料价格 */}
        <div className={styles.base}>
          <p className={styles.field}>原料价格：</p>
          <p className={styles.value}>
            {unitPriceFormat(Number(rawMaterial?.rawMaterialUnitPrice ?? 0))}
          </p>
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

export default RawMaterialBaseDetail;
