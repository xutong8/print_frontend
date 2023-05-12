import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Button, Input, InputNumber, Tag, message, DatePicker } from "antd";
import styles from "./index.module.less";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { RawMaterialType } from "../RawMaterialEdit";
import {
  IHistoryPriceSimple,
  IRawMaterial,
} from "@/services/fetchRawMaterialById";
import { DayType } from "@/types";

export interface IRawMaterialBaseEditProps {
  rawMaterial: RawMaterialType;
  setRawMaterial: (rawMaterial: RawMaterialType) => void;
}

export interface RawMaterialBaseEditRef {
  hpRelations: IHistoryPriceSimple[];
  setHPRelations: (hpRelations: IHistoryPriceSimple[]) => void;
}

const RawMaterialBaseEdit = (
  props: IRawMaterialBaseEditProps,
  ref: ForwardedRef<RawMaterialBaseEditRef>
) => {
  const { rawMaterial, setRawMaterial } = props;

  // 填写的价格
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  // 日期格式化
  const dateFormat = "YYYY-MM-DD";
  // 当前日期
  const [currentDate, setCurrentDate] = useState<DayType>(null);

  // TODO: 历史价格
  const [hpRelations, setHPRelations] = useState<IHistoryPriceSimple[]>(
    rawMaterial?.rawMaterialHistoryPrice ?? []
  );

  // 添加历史价格
  const handlePriceAdd = () => {
    if (currentPrice <= 0 || currentDate === null) {
      message.warning("历史价格数据不能为空，新增失败！");
      return;
    }

    const relation = {
      date: currentDate.format(dateFormat),
      price: currentPrice,
    };
    setHPRelations([...hpRelations, relation]);
  };

  // 删除历史价格
  //这边可能有问题，不能按照date来filter，但严格来说也可以，因为同一个日期只能有一个价格
  const handleHpDel = (relation: IHistoryPriceSimple) => {
    setHPRelations(
      hpRelations.filter((rm) => rm.date !== relation.date)
    );
  };

  useImperativeHandle(ref, () => ({
    hpRelations,
    setHPRelations,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* 原料名称 */}
        <div className={styles.base}>
          <p className={styles.field}>原料名称：</p>
          <Input
            className={styles.input}
            value={rawMaterial?.rawMaterialName ?? ""}
            onChange={(event) => {
              setRawMaterial({
                ...(rawMaterial ?? ({} as IRawMaterial)),
                rawMaterialName: event.target.value,
              });
            }}
          />
        </div>
        {/* 原料标识 */}
        <div className={styles.base}>
          <p className={styles.field}>原料标识：</p>
          <Input
            className={styles.input}
            value={rawMaterial?.rawMaterialId ?? 0}
            onChange={(event) => {
              setRawMaterial({
                ...(rawMaterial ?? ({} as IRawMaterial)),
                rawMaterialId: Number(event.target.value),
              });
            }}
          />
        </div>
        {/* 原料编号 */}
        <div className={styles.base}>
          <p className={styles.field}>原料编号：</p>
          <Input
            className={styles.input}
            value={rawMaterial?.rawMaterialIndex ?? ""}
            onChange={(event) => {
              setRawMaterial({
                ...(rawMaterial ?? ({} as IRawMaterial)),
                rawMaterialIndex: event.target.value,
              });
            }}
          />
        </div>
        {/* 常规原料 */}
        <div className={styles.base}>
          <p className={styles.field}>常规原料：</p>
          <Input
            className={styles.input}
            value={rawMaterial?.rawMaterialConventional ?? ""}
            onChange={(event) => {
              setRawMaterial({
                ...(rawMaterial ?? ({} as IRawMaterial)),
                rawMaterialConventional: event.target.value,
              });
            }}
          />
        </div>
        {/* 原料规格 */}
        <div className={styles.base}>
          <p className={styles.field}>原料规格：</p>
          <Input
            className={styles.input}
            value={rawMaterial?.rawMaterialSpecification ?? ""}
            onChange={(event) => {
              setRawMaterial({
                ...(rawMaterial ?? ({} as IRawMaterial)),
                rawMaterialSpecification: event.target.value,
              });
            }}
          />
        </div>
        {/* 原料价格 */}
        <div className={styles.base}>
          <p className={styles.field}>原料价格：</p>
          <Input
            className={styles.input}
            value={rawMaterial?.rawMaterialUnitPrice ?? ""}
            onChange={(event) => {
              setRawMaterial({
                ...(rawMaterial ?? ({} as IRawMaterial)),
                rawMaterialUnitPrice: Number(event.target.value),
              });
            }}
          />
        </div>
        {/* 原料涨幅 */}
        <div className={styles.base}>
          <p className={styles.field}>原料涨幅：</p>
          <Input
            className={styles.input}
            value={rawMaterial?.rawMaterialIncreasePercent ?? 0}
            onChange={(event) => {
              setRawMaterial({
                ...(rawMaterial ?? ({} as IRawMaterial)),
                rawMaterialIncreasePercent: Number(event.target.value),
              });
            }}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.price_relations}>
          <div className={styles.title}>
            <div className={styles.field}>历史价格</div>
            <Button
              className={styles.btn}
              type="primary"
              ghost
              icon={<PlusCircleTwoTone />}
              onClick={handlePriceAdd}
            >
              新增
            </Button>
          </div>
          <div className={styles.new_relation}>
            <div className={styles.name}>
              <p>当期价格：</p>
              <InputNumber
                value={currentPrice}
                onChange={(value) => setCurrentPrice(value as number)}
              />
            </div>
            <div className={styles.amount}>
              <p>当期日期：</p>
              <DatePicker
                value={currentDate}
                format={dateFormat}
                onChange={(date: DayType) => setCurrentDate(date)}
              />
            </div>
          </div>
          <div className={styles.exist_relations}>
            {
              hpRelations.map((relation, index: number) => (
                <Tag closable key={index} onClose={() => handleHpDel(relation)}>
                  <span>{relation.date}</span>
                  <span className={styles.tag_inventory}>
                    {Number(relation.price).toFixed(2)}
                  </span>
                </Tag>
              )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef<RawMaterialBaseEditRef, IRawMaterialBaseEditProps>(
  RawMaterialBaseEdit
);
