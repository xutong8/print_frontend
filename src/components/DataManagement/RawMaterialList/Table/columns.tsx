import { ColumnsType } from "antd/es/table";
import styles from "./index.module.less";
import { unitPriceFormat } from "@/utils";
import ChangeRatio from "@/components/ChangeRatio";

export interface IRecord {
  rawMaterialId: string;
  rawMaterialName: string;
  rawMaterialIndex: string;
  rawMaterialConventional: string;
  rawMaterialUnitPrice: number;
  rawMaterialIncreasePercent: number;
  rawMaterialSpecification: string;
}

const columns: ColumnsType<IRecord> = [
  {
    title: "序号",
    dataIndex: "rawMaterialId",
    key: "rawMaterialId",
  },
  {
    title: "原料品名",
    dataIndex: "rawMaterialName",
    key: "rawMaterialName",
  },
  {
    title: "存货编号",
    dataIndex: "rawMaterialIndex",
    key: "rawMaterialIndex",
  },
  {
    title: "是否为常规原料",
    dataIndex: "rawMaterialConventional",
    key: "rawMaterialConventional",
  },
  {
    title: "原料单价",
    dataIndex: "rawMaterialUnitPrice",
    key: "rawMaterialUnitPrice",
    render: (value: number) => {
      return <div>{unitPriceFormat(value)}</div>;
    },
  },
  {
    title: "近期涨幅",
    dataIndex: "rawMaterialIncreasePercent",
    key: "rawMaterialIncreasePercent",
    width: 120,
    render: (value: number) => {
      return <ChangeRatio value={value} />;
    },
  },
  {
    title: "规格",
    dataIndex: "rawMaterialSpecification",
    key: "rawMaterialSpecification",
  },
  {
    title: "操作",
    dataIndex: "",
    key: "action",
    render: (record) => {
      return (
        <div className={styles.action}>
          <div className={styles.text}>删除</div>
          <div className={styles.text}>编辑</div>
          <div className={styles.text}>查看详细信息</div>
        </div>
      );
    },
  },
];

export default columns;
