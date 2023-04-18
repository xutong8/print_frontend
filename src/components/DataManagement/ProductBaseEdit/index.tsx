import React, { useState } from "react";
import { Button, Input, InputNumber, Select, Tag } from "antd";
import styles from "./index.module.less";
import TextArea from "antd/es/input/TextArea";
import { PlusCircleTwoTone } from "@ant-design/icons";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { FilterCakeType, ProductType, RawMaterialType } from "../ProductEdit";
import { IProductSeries } from "@/services/fetchProductSeries";
import { IRawMaterial } from "@/services/fetchRawMaterials";
import { IProduct } from "@/services/fetchProductById";
import { IFilterCake } from "@/services/fetchFilterCakes";

export interface IProductBaseEditProps {
  product: ProductType;
  setProduct: (product: ProductType) => void;
  series: IProductSeries[];
  rawMaterials: IRawMaterial[];
  filterCakes: IFilterCake[];
}

const ProductBaseEdit: React.FC<IProductBaseEditProps> = (props) => {
  const { product, setProduct, series, rawMaterials, filterCakes } = props;

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

  // 添加原料关联
  const handleRmAdd = () => {};

  const relations = [
    { name: "原料1", amount: 100 },
    { name: "原料2", amount: 150 },
  ];

  const handleClose = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* 产品名称 */}
        <div className={styles.base}>
          <p className={styles.field}>产品名称：</p>
          <Input
            className={styles.input}
            value={product?.productName ?? ""}
            onChange={(event) => {
              setProduct({
                ...(product ?? ({} as IProduct)),
                productName: event.target.value,
              });
            }}
          />
        </div>
        {/* 产品编号 */}
        <div className={styles.base}>
          <p className={styles.field}>产品编号：</p>
          <Input
            className={styles.input}
            value={product?.productIndex ?? ""}
            onChange={(event) => {
              setProduct({
                ...(product ?? ({} as IProduct)),
                productIndex: event.target.value,
              });
            }}
          />
        </div>
        {/* 产品代码 */}
        <div className={styles.base}>
          <p className={styles.field}>产品代码：</p>
          <Input
            className={styles.input}
            value={product?.productCode ?? ""}
            onChange={(event) => {
              setProduct({
                ...(product ?? ({} as IProduct)),
                productCode: event.target.value,
              });
            }}
          />
        </div>
        {/* 产品系列 */}
        <div className={styles.base}>
          <p className={styles.field}>产品系列：</p>
          <Select
            className={styles.input}
            value={product?.productSeriesName ?? ""}
            options={series.map((item) => ({
              value: item.productSeriesName,
              label: item.productSeriesName,
            }))}
          />
        </div>
        {/* 产品颜色 */}
        <div className={styles.base}>
          <p className={styles.field}>产品颜色：</p>
          <Input
            className={styles.input}
            value={product?.productColor ?? ""}
            onChange={(event) => {
              setProduct({
                ...(product ?? ({} as IProduct)),
                productColor: event.target.value,
              });
            }}
          />
        </div>
        {/* TODO: 加工成本 */}
        <div className={styles.base}>
          <p className={styles.field}>加工成本：</p>
          <Input className={styles.input} defaultValue={0} />
        </div>
        {/* TODO: 核算数量 */}
        <div className={styles.base}>
          <p className={styles.field}>核算数量：</p>
          <Input className={styles.input} defaultValue={0} />
        </div>
        {/* TODO: 附加信息 */}
        <div className={styles.base}>
          <p className={styles.field}>附加信息：</p>
          <TextArea className={styles.input} defaultValue={"请输入附加信息"} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rm_relations}>
          <div className={styles.title}>
            <div className={styles.field}>原料关联</div>
            <Button
              className={styles.btn}
              type="primary"
              ghost
              icon={<PlusCircleTwoTone />}
              onClick={handleRmAdd}
            >
              新增
            </Button>
          </div>
          <div className={styles.new_relation}>
            <div className={styles.name}>
              <p>原料名称：</p>
              <Select
                value={selectedRawMaterial?.rawMaterialName}
                options={rawMaterials.map((rawMaterial) => ({
                  value: rawMaterial?.rawMaterialName ?? "",
                  label: rawMaterial?.rawMaterialName ?? "",
                }))}
                className={styles.select}
                onChange={(rawMaterialName: string) => {
                  const rawMaterial =
                    rawMaterials.find(
                      (rawMaterial) =>
                        rawMaterial.rawMaterialName === rawMaterialName
                    ) ?? null;
                  setSelectedRawMaterial(rawMaterial);
                }}
              />
            </div>
            <div className={styles.amount}>
              <p>原料用量：</p>
              <InputNumber
                value={rmAmount}
                onChange={(value) => setRMAmount(value as number)}
              />
            </div>
            <div className={styles.enable}>
              <Checkbox
                checked={rmEnable}
                onChange={(e: CheckboxChangeEvent) => {
                  setRMEnable(e.target.checked);
                }}
              >
                启用百分比
              </Checkbox>
            </div>
          </div>
          <div className={styles.exist_relations}>
            {relations.map((relation, index: number) => (
              <Tag closable key={index}>
                <span>{relation.amount}</span>
                <span>{relation.name}</span>
              </Tag>
            ))}
          </div>
        </div>
        <div className={styles.fc_relations}>
          <div className={styles.title}>
            <div className={styles.field}>滤饼关联</div>
            <Button
              className={styles.btn}
              type="primary"
              ghost
              icon={<PlusCircleTwoTone />}
              onClick={handleRmAdd}
            >
              新增
            </Button>
          </div>
          <div className={styles.new_relation}>
            <div className={styles.name}>
              <p>滤饼名称：</p>
              <Select
                value={selectedFilterCake?.filterCakeName}
                options={filterCakes.map((filterCake) => ({
                  value: filterCake?.filterCakeName ?? "",
                  label: filterCake?.filterCakeName ?? "",
                }))}
                className={styles.select}
                onChange={(filterCakeName: string) => {
                  const filterCake =
                    filterCakes.find(
                      (filterCake) =>
                        filterCake.filterCakeName === filterCakeName
                    ) ?? null;
                  setSelectedFilterCake(filterCake);
                }}
              />
            </div>
            <div className={styles.amount}>
              <p>滤饼用量：</p>
              <InputNumber
                value={fcAmount}
                onChange={(value) => setFCAmount(value as number)}
              />
            </div>
            <div className={styles.enable}>
              <Checkbox
                checked={fcEnable}
                onChange={(e: CheckboxChangeEvent) =>
                  setFCEnable(e.target.value)
                }
              >
                启用百分比
              </Checkbox>
            </div>
          </div>
          <div className={styles.exist_relations}>
            {relations.map((relation, index: number) => (
              <Tag closable key={index}>
                <span>{relation.amount}</span>
                <span>{relation.name}</span>
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBaseEdit;
