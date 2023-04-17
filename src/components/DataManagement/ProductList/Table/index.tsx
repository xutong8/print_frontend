import React from "react";
import styles from "./index.module.less";
import { FilterCakeType, ProductSeriesType, RawMaterialType } from "..";
import CustomTable from "@/components/Table";
import { table_header } from "@/assets";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import columns, { IRecord } from './columns';

export interface ITableProps {
  filterCake: FilterCakeType;
  productSeries: ProductSeriesType;
  rawMaterial: RawMaterialType;
}

const Table: React.FC<ITableProps> = (props) => {
  const baseUrl = "/product/findAllByCondition";
  const { filterCake, productSeries, rawMaterial } = props;

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={styles.text}>
          <img src={table_header} alt="table desc" />
          <p className={styles.desc}>产品列表</p>
        </div>
        <Button type="primary" icon={<DownloadOutlined />}>下载</Button>
      </div>
      <div className={styles.main}>
        <CustomTable
          baseUrl={baseUrl}
          query={{
            filterCakeName: filterCake?.filterCakeName ?? void 0,
            productSeriesName: productSeries?.productSeriesName ?? void 0,
            rawMaterialName: rawMaterial?.rawMaterialName ?? void 0,
          }}
          columns={columns}
          rowKey={(record: IRecord) => record.productId}
        />
      </div>
    </div>
  );
};

export default Table;
