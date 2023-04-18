import React, { useRef, useState } from "react";
import styles from "./index.module.less";
import { FilterCakeType, ProductSeriesType, RawMaterialType } from "..";
import CustomTable from "@/components/Table";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import genColumns, { IRecord } from "./columns";
import { ProductEditRef } from "../../ProductEdit";
import Header from "@/components/Header";

export interface ITableProps {
  filterCake: FilterCakeType;
  productSeries: ProductSeriesType;
  rawMaterial: RawMaterialType;
}

const Table: React.FC<ITableProps> = (props) => {
  const baseUrl = "/product/findAllByCondition";
  const { filterCake, productSeries, rawMaterial } = props;
  const [, setForceUpdate] = useState<{}>({});
  const editModalRef = useRef<ProductEditRef>(null);

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <Header desc="产品列表" />
        <Button type="primary" icon={<DownloadOutlined />}>
          下载
        </Button>
      </div>
      <div className={styles.main}>
        <CustomTable
          baseUrl={baseUrl}
          query={{
            filterCakeName: filterCake?.filterCakeName ?? void 0,
            productSeriesName: productSeries?.productSeriesName ?? void 0,
            rawMaterialName: rawMaterial?.rawMaterialName ?? void 0,
          }}
          columns={genColumns(setForceUpdate, editModalRef)}
          rowKey={(record: IRecord) => record.productId}
        />
      </div>
    </div>
  );
};

export default Table;
