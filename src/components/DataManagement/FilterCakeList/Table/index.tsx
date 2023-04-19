import React, { useRef, useState } from "react";
import styles from "./index.module.less";
import CustomTable from "@/components/Table";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import genColumns, { IRecord } from "./columns";
import Header from "@/components/Header";
import { FilterCakeEditRef } from "../../FilterCakeEdit";
import { FilterCakeDetailRef } from "../../FilterCakeDetail";

export interface ITableProps {
  searchField: string;
  searchCondition: string;
}

const Table: React.FC<ITableProps> = (props) => {
  const baseUrl = "/filterCake/findAllFilterCakeByCondition";
  const { searchField, searchCondition } = props;
  const [, setForceUpdate] = useState<{}>({});
  const editModalRef = useRef<FilterCakeEditRef>(null);
  const previewModalRef = useRef<FilterCakeDetailRef>(null);

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <Header desc="滤饼列表" />
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
          rowKey={(record: IRecord) => record.filterCakeId}
        />
      </div>
    </div>
  );
};

export default Table;
