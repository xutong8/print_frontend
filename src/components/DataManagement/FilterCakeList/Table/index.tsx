import React from "react";
import styles from "./index.module.less";
import CustomTable from "@/components/Table";
import { table_header } from "@/assets";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import columns, { IRecord } from './columns';

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
        <div className={styles.text}>
          <img src={table_header} alt="table desc" />
          <p className={styles.desc}>滤饼列表</p>
        </div>
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
