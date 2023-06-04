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
import {
  FilterCakeNameType,
  ProductNameType,
  ProductType,
  RawMaterialNameType,
} from "../ProductEdit";
import { IProductSeriesName } from "@/services/fetchProductSeries";
import { IRawMaterialName } from "@/services/fetchRawMaterials";
import {
  IFilterCakeSimple,
  IProduct,
  IProductSimple,
  IRawMaterialSimple,
} from "@/services/fetchProductById";
import { IFilterCakeName } from "@/services/fetchFilterCakes";
import { IProductName } from "@/services/fetchProductNames";

export interface IProductBaseEditProps {
  product: ProductType;
  setProduct: (product: ProductType) => void;
  series: IProductSeriesName[];
  rawMaterials: IRawMaterialName[];
  filterCakes: IFilterCakeName[];
  products: IProductName[];
}

export interface ProductBaseEditRef {
  rmRelations: IRawMaterialSimple[];
  setRMRelations: (rmRelations: IRawMaterialSimple[]) => void;
  fcRelations: IFilterCakeSimple[];
  setFCRelations: (fcRelations: IFilterCakeSimple[]) => void;
  pdRelations: IProductSimple[];
  setPDRelations: (pdRelations: IProductSimple[]) => void;
}

const ProductBaseEdit = (
  props: IProductBaseEditProps,
  ref: ForwardedRef<ProductBaseEditRef>
) => {
  const { product, setProduct, series, rawMaterials, filterCakes, products } = props;

  // 选中的原料
  const [selectedRawMaterial, setSelectedRawMaterial] =
    useState<RawMaterialNameType>(null);
  // 选中的滤饼
  const [selectedFilterCake, setSelectedFilterCake] =
    useState<FilterCakeNameType>(null);
  // 选中的产品
  const [selectedProduct, setSelectedProduct] =
    useState<ProductNameType>(null);

  // 原料投入量
  const [rmAmount, setRMAmount] = useState<number>(0);
  // 原料启用百分比
  const [rmEnable, setRMEnable] = useState<boolean>(true);
  // 滤饼投入量
  const [fcAmount, setFCAmount] = useState<number>(0);
  // 滤饼启用百分比
  const [fcEnable, setFCEnable] = useState<boolean>(true);
  // 产品投入量
  const [pdAmount, setPDAmount] = useState<number>(0);
  // 产品启用百分比
  const [pdEnable, setPDEnable] = useState<boolean>(true);

  // 原料关联
  const [rmRelations, setRMRelations] = useState<IRawMaterialSimple[]>(
    product?.rawMaterialSimpleList ?? []
  );
  // 滤饼关联
  const [fcRelations, setFCRelations] = useState<IFilterCakeSimple[]>(
    product?.filterCakeSimpleList ?? []
  );
  // 产品关联
  const [pdRelations, setPDRelations] = useState<IProductSimple[]>(
    product?.productSimpleList ?? []
  );

  // 添加原料关联
  const handleRmAdd = () => {
    if (selectedRawMaterial === null || rmAmount <= 0) {
      message.warning("原料关联数据不能为空，新增失败！");
      return;
    }

    const relation = {
      rawMaterialId: selectedRawMaterial?.id ?? 0,
      rawMaterialName: selectedRawMaterial?.name ?? "",
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
      filterCakeId: selectedFilterCake?.id ?? 0,
      filterCakeName: selectedFilterCake?.name ?? "",
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

  // 添加产品关联
  const handlePdAdd = () => {
    if (selectedProduct === null || pdAmount <= 0) {
      message.warning("滤饼关联数据不能为空，新增失败！");
      return;
    }

    const relation = {
      productId: selectedProduct?.id ?? 0,
      productName: selectedProduct?.name ?? "",
      inventory: pdEnable ? pdAmount / 100 : pdAmount,
    };
    setPDRelations([...pdRelations, relation]);
  };
  // 删除产品关联
  const handlePdDel = (relation: IProductSimple) => {
    setPDRelations(
      pdRelations.filter((pd) => pd.productId !== relation.productId)
    );
  };


  useImperativeHandle(ref, () => ({
    rmRelations,
    setRMRelations,
    fcRelations,
    setFCRelations,
    pdRelations,
    setPDRelations
  }));

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
        {/* 生产工厂 */}
        <div className={styles.base}>
          <p className={styles.field}>生产工厂：</p>
          <Input
            className={styles.input}
            value={product?.productFactoryName ?? ""}
            onChange={(event) => {
              setProduct({
                ...(product ?? ({} as IProduct)),
                productFactoryName: event.target.value,
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
              value: item.name,
              label: item.name,
            }))}
            onChange={(productSeriesName) => {
              setProduct({
                ...(product ?? ({} as IProduct)),
                productSeriesName,
              });
            }}
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
        {/* 加工成本 */}
        <div className={styles.base}>
          <p className={styles.field}>加工成本：</p>
          <Input
            className={styles.input}
            value={product?.productProcessingCost ?? 0}
            onChange={(event) => {
              setProduct({
                ...(product ?? ({} as IProduct)),
                productProcessingCost: Number(event.target.value),
              });
            }}
          />
        </div>
        {/* 核算数量 */}
        <div className={styles.base}>
          <p className={styles.field}>核算数量：</p>
          <Input
            className={styles.input}
            value={product?.productAccountingQuantity ?? 0}
            onChange={(event) => {
              setProduct({
                ...(product ?? ({} as IProduct)),
                productAccountingQuantity: Number(event.target.value),
              });
            }}
          />
        </div>
        {/* 附加信息 */}
        <div className={styles.base}>
          <p className={styles.field}>附加信息：</p>
          <TextArea
            className={styles.input}
            value={product?.productRemarks ?? ""}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setProduct({
                ...(product ?? ({} as IProduct)),
                productRemarks: event.target.value,
              });
            }}
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
                value={selectedRawMaterial?.name}
                options={rawMaterials.map((rawMaterial) => ({
                  value: rawMaterial?.name ?? "",
                  label: rawMaterial?.name ?? "",
                }))}
                className={styles.select}
                onChange={(rawMaterialName: string) => {
                  const rawMaterial =
                    rawMaterials.find(
                      (rawMaterial) =>
                        rawMaterial.name === rawMaterialName
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
          </div>
          <div className={styles.exist_relations}>
            {rmRelations.map((relation, index: number) => (
              <Tag closable key={index} onClose={() => handleRmDel(relation)}>
                <span>{relation.rawMaterialName}</span>
                <span className={styles.tag_inventory}>
                  {(relation.inventory * 100).toFixed(2) + "%"}
                </span>
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
              onClick={handleFcAdd}
            >
              新增
            </Button>
          </div>
          <div className={styles.new_relation}>
            <div className={styles.name}>
              <p>滤饼名称：</p>
              <Select
                value={selectedFilterCake?.name}
                options={filterCakes.map((filterCake) => ({
                  value: filterCake?.name ?? "",
                  label: filterCake?.name ?? "",
                }))}
                className={styles.select}
                onChange={(filterCakeName: string) => {
                  const filterCake =
                    filterCakes.find(
                      (filterCake) =>
                        filterCake.name === filterCakeName
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
          </div>
          <div className={styles.exist_relations}>
            {fcRelations.map((relation, index: number) => (
              <Tag closable key={index} onClose={() => handleFcDel(relation)}>
                <span>{relation.filterCakeName}</span>
                <span className={styles.tag_inventory}>
                  {(relation.inventory * 100).toFixed(2) + "%"}
                </span>
              </Tag>
            ))}
          </div>
        </div>
        <div className={styles.pd_relations}>
          <div className={styles.title}>
            <div className={styles.field}>产品关联</div>
            <Button
              className={styles.btn}
              type="primary"
              ghost
              icon={<PlusCircleTwoTone />}
              onClick={handlePdAdd}
            >
              新增
            </Button>
          </div>
          <div className={styles.new_relation}>
            <div className={styles.name}>
              <p>产品名称：</p>
              <Select
                value={selectedProduct?.name}
                options={products.map((product) => ({
                  value: product?.name ?? "",
                  label: product?.name ?? "",
                }))}
                className={styles.select}
                onChange={(productName: string) => {
                  const product =
                    products.find(
                      (product) =>
                        product.name === productName
                    ) ?? null;
                  setSelectedProduct(product);
                }}
              />
            </div>
            <div className={styles.amount}>
              <p>产品用量：</p>
              <InputNumber
                value={pdAmount}
                onChange={(value) => setPDAmount(value as number)}
              />
            </div>
          </div>
          <div className={styles.exist_relations}>
            {pdRelations.map((relation, index: number) => (
              <Tag closable key={index} onClose={() => handlePdDel(relation)}>
                <span>{relation.productName}</span>
                <span className={styles.tag_inventory}>
                  {(relation.inventory * 100).toFixed(2) + "%"}
                </span>
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef<ProductBaseEditRef, IProductBaseEditProps>(
  ProductBaseEdit
);
