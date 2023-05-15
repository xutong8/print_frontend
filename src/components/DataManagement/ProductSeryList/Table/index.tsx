import React, { useRef, useState } from "react";
import styles from "./index.module.less";
import CustomTable from "@/components/Table";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import genColumns, { IRecord } from "./columns";
import Header from "@/components/Header";
import { ProductSeriesEditRef } from "../../ProductSeryEdit";
import { ProductSeriesDetailRef } from "../../ProductSeryDetail";

export interface ITableProps {
  searchField: string;
  searchCondition: string;
}

const Table: React.FC<ITableProps> = (props) => {
  const baseUrl = "/productSeries/findAllProductSeriesByCondition";
  const { searchField, searchCondition } = props;
  const [, setForceUpdate] = useState<{}>({});
  const editModalRef = useRef<ProductSeriesEditRef>(null);
  const previewModalRef = useRef<ProductSeriesDetailRef>(null);

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <Header desc="产品系列表" />
        <Button type="primary" icon={<DownloadOutlined />}>
          下载
        </Button>
      </div>
      <div className={styles.main}>
        <CustomTable
          baseUrl={baseUrl}
          query={{
            conditionOfQuery: searchCondition,
            typeOfQuery: searchField,
          }}
          columns={genColumns(setForceUpdate, editModalRef, previewModalRef)}
          rowKey={(record: IRecord) => record.productSeriesId}
        />
      </div>
    </div>
  );
};

export default Table;
