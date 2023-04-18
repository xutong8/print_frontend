import { IProduct } from "@/services/fetchProductById";
import { Button, Input, InputNumber, Modal, Select } from "antd";
import React, { forwardRef, useState } from "react";
import { useImperativeHandle, ForwardedRef } from "react";
import styles from "./index.module.less";
import { IProductSeries } from "@/services/fetchProductSeries";
import TextArea from "antd/es/input/TextArea";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { IRawMaterial } from "@/services/fetchRawMaterials";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { close } from "@/assets";
import { IFilterCake } from "@/services/fetchFilterCakes";

export interface IProductEditProps {}

export interface ProductEditRef {
  setShowModal: (showModal: boolean) => void;
  setProduct: (product: ProductType) => void;
  setSeries: (series: IProductSeries[]) => void;
  setRawMaterials: (rawMaterials: IRawMaterial[]) => void;
  setFilterCakes: (filterCakes: IFilterCake[]) => void;
}

export type ProductType = IProduct | null;
export type RawMaterialType = IRawMaterial | null;
export type FilterCakeType = IFilterCake | null;

const ProductEdit = (
  props: IProductEditProps,
  ref: ForwardedRef<ProductEditRef>
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>(null);
  // 产品系列
  const [series, setSeries] = useState<IProductSeries[]>([]);
  // 原料名称
  const [rawMaterials, setRawMaterials] = useState<IRawMaterial[]>([]);
  // 滤饼名称
  const [filterCakes, setFilterCakes] = useState<IFilterCake[]>([]);
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

  // 点击确认
  const handleOk = () => {
    setSelectedRawMaterial(null);
    setRMAmount(0);
    setRMEnable(false);
    setSelectedFilterCake(null);
    setFCAmount(0);
    setFCEnable(false);
    setShowModal(false);
    // TODO：添加修改产品的逻辑
  };

  // 点击取消
  const handleCancel = () => {
    setSelectedRawMaterial(null);
    setRMAmount(0);
    setRMEnable(false);
    setSelectedFilterCake(null);
    setFCAmount(0);
    setFCEnable(false);
    setShowModal(false);
  };

  useImperativeHandle(ref, () => ({
    setShowModal,
    setProduct,
    setSeries,
    setRawMaterials,
    setFilterCakes,
  }));

  // 添加原料关联
  const handleRmAdd = () => {};

  const relations = [
    { name: "原料1", amount: 100 },
    { name: "原料2", amount: 150 },
  ];

  const handleClose = () => {};

  return (
    <Modal
      title="产品编辑"
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
      width={1000}
    >
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
            <TextArea
              className={styles.input}
              defaultValue={"请输入附加信息"}
            />
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
                <div key={index} className={styles.exist_relation}>
                  <div className={styles.content}>
                    <p>{relation.amount}</p>
                    <p>{relation.name}</p>
                  </div>
                  <div className={styles.close}>
                    <img src={close} alt="close icon" onClick={handleClose} />
                  </div>
                </div>
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
                <div key={index} className={styles.exist_relation}>
                  <div className={styles.content}>
                    <p>{relation.amount}</p>
                    <p>{relation.name}</p>
                  </div>
                  <div className={styles.close}>
                    <img src={close} alt="close icon" onClick={handleClose} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef<ProductEditRef, IProductEditProps>(ProductEdit);
