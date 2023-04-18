import React from "react";
import styles from "./index.module.less";
import CustomTable from "@/components/Table";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import columns, { IRecord } from './columns';
import Header from "@/components/Header";

export interface ITableProps {
  searchField: string;
  searchCondition: string;
}

const Table: React.FC<ITableProps> = (props) => {
  const baseUrl = "/filterCake/findAllFilterCakeByCondition";
  const { searchField, searchCondition } = props;

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <Header desc="滤饼列表" />
        <Button type="primary" icon={<DownloadOutlined />}>下载</Button>
      </div>
      <div className={styles.main}>
      <CustomTable
          baseUrl={baseUrl}
          query={{
            conditionOfQuery: searchCondition,
            typeOfQuery: searchField
          }}
          columns={columns}
          rowKey={(record: IRecord) => record.filterCakeId}
        />
      </div>
    </div>
  );
};

export default Table;
