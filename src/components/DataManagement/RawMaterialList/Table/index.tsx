import React, { useRef, useState } from "react";
import styles from "./index.module.less";
import CustomTable from "@/components/Table";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import genColumns, { IRecord } from "./columns";
import Header from "@/components/Header";
import { RawMaterialEditRef } from "../../RawMaterialEdit";
import { RawMaterialDetailRef } from "../../RawMaterialDetail";

export interface ITableProps {
  searchField: string;
  searchCondition: string;
}

const Table: React.FC<ITableProps> = (props) => {
  const baseUrl = "/rawMaterial/findAllRawMaterialByCondition";
  const { searchField, searchCondition } = props;
  const [, setForceUpdate] = useState<{}>({});
  const editModalRef = useRef<RawMaterialEditRef>(null);
  const previewModalRef = useRef<RawMaterialDetailRef>(null);

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <Header desc="原料列表" />
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
          rowKey={(record: IRecord) => record.rawMaterialId}
        />
      </div>
    </div>
  );
};

export default Table;
