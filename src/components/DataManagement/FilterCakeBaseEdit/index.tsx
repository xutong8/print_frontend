import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import {
  Button,
  Input,
  InputNumber,
  Select,
  Tag,
  message,
} from "antd";
import styles from "./index.module.less";
import TextArea from "antd/es/input/TextArea";
import { PlusCircleTwoTone } from "@ant-design/icons";
import {
  FilterCakeType,
  RawMaterialNameType,
  FilterCakeNameType,
} from "../FilterCakeEdit";
import {
  IFilterCake,
  IFilterCakeSimple,
  IRawMaterialSimple,
} from "@/services/fetchFilterCakeById";
import { IRawMaterialName } from "@/services/fetchRawMaterials";
import { IFilterCakeName } from "@/services/fetchFilterCakes";

export interface IFilterCakeBaseEditProps {
  filterCake: FilterCakeType;
  setFilterCake: (filterCake: FilterCakeType) => void;
  rawMaterials: IRawMaterialName[];
  filterCakes: IFilterCakeName[];
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
  const { filterCake, setFilterCake, rawMaterials, filterCakes } = props;

  // 选中的原料
  const [selectedRawMaterial, setSelectedRawMaterial] =
    useState<RawMaterialNameType>(null);
  // 选中的滤饼
  const [selectedFilterCake, setSelectedFilterCake] =
    useState<FilterCakeNameType>(null);
  // 原料投入量
  const [rmAmount, setRMAmount] = useState<number>(0);
  // 原料启用百分比
  const [rmEnable, setRMEnable] = useState<boolean>(false);
  // 滤饼投入量
  const [fcAmount, setFCAmount] = useState<number>(0);
  // 滤饼启用百分比
  const [fcEnable, setFCEnable] = useState<boolean>(false);

  // 填写的价格
  // const [currentPrice, setCurrentPrice] = useState<number>(0);

  // 日期格式化
  // const dateFormat = "YYYY/MM/DD";
  // // 当前日期
  // const [currentDate, setCurrentDate] = useState<DayType>(null);

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
        {/* 滤饼编号 */}
        <div className={styles.base}>
          <p className={styles.field}>滤饼编号：</p>
          <Input
            className={styles.input}
            value={filterCake?.filterCakeIndex ?? ""}
            onChange={(event) => {
              setFilterCake({
                ...(filterCake ?? ({} as IFilterCake)),
                filterCakeIndex: event.target.value,
              });
            }}
          />
        </div>
        {/* 滤饼颜色 */}
        <div className={styles.base}>
          <p className={styles.field}>滤饼颜色：</p>
          <Input
            className={styles.input}
            value={filterCake?.filterCakeColor ?? ""}
            onChange={(event) => {
              setFilterCake({
                ...(filterCake ?? ({} as IFilterCake)),
                filterCakeColor: event.target.value,
              });
            }}
          />
        </div>
        {/* 核算数量 */}
        <div className={styles.base}>
          <p className={styles.field}>核算数量：</p>
          <Input
            className={styles.input}
            value={filterCake?.filterCakeAccountingQuantity ?? ""}
            onChange={(event) => {
              setFilterCake({
                ...(filterCake ?? ({} as IFilterCake)),
                filterCakeAccountingQuantity: Number(event.target.value),
              });
            }}
          />
        </div>
        {/* 加工成本 */}
        <div className={styles.base}>
          <p className={styles.field}>加工成本：</p>
          <Input
            className={styles.input}
            value={filterCake?.filterCakeProcessingCost ?? ""}
            onChange={(event) => {
              setFilterCake({
                ...(filterCake ?? ({} as IFilterCake)),
                filterCakeProcessingCost: Number(event.target.value),
              });
            }}
          />
        </div>
        {/* 滤饼规格 */}
        <div className={styles.base}>
          <p className={styles.field}>滤饼规格：</p>
          <Input
            className={styles.input}
            value={filterCake?.filterCakeSpecification ?? ""}
            onChange={(event) => {
              setFilterCake({
                ...(filterCake ?? ({} as IFilterCake)),
                filterCakeSpecification: event.target.value,
              });
            }}
          />
        </div>
        {/* 附加信息 */}
        <div className={styles.base}>
          <p className={styles.field}>附加信息：</p>
          <TextArea
            className={styles.input}
            value={filterCake?.filterCakeRemarks ?? ""}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setFilterCake({
                ...(filterCake ?? ({} as IFilterCake)),
                filterCakeRemarks: event.target.value,
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
                  {Number(relation.inventory).toFixed(2)}
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
                  {Number(relation.inventory).toFixed(2)}
                </span>
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef<FilterCakeBaseEditRef, IFilterCakeBaseEditProps>(
  FilterCakeBaseEdit
);
