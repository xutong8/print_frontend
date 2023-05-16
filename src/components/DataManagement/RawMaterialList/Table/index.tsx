import React, { useRef, useState } from "react";
import styles from "./index.module.less";
import CustomTable from "@/components/Table";
import { Button } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import genColumns, { IRecord } from "./columns";
import Header from "@/components/Header";
import { RawMaterialEditRef } from "../../RawMaterialEdit";
import { RawMaterialDetailRef } from "../../RawMaterialDetail";
import Uploader, { UploaderRef } from "../Uploader";
import WithModal, { WithModalRef } from "@/components/WithModal";
import DownloadBase from "@/components/DownloadBase";

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



  const uploaderRef = useRef<UploaderRef>(null);
  const downloadRef = useRef<WithModalRef>(null);

  const handleUpload = () => {
    uploaderRef.current?.showModal();
  }

  const handleDownload = () => {
    downloadRef.current?.showModal();
  }

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <Header desc="原料列表" />
        <div className={styles.right}>
          <Button type="primary" icon={<UploadOutlined />} className={styles.upload} onClick={handleUpload}>
            上传
          </Button>
          <Uploader ref={uploaderRef}></Uploader>
          <Button type="primary" icon={<DownloadOutlined />} className={styles.download} onClick={handleDownload}>
            下载
          </Button>
          <WithModal
            componentList={
              [
                <DownloadBase text={"下载原料信息"} url={"rawMaterial/exportExcel"}></DownloadBase>,
                <DownloadBase text={"下载原料-历史价格关联信息"} url={"rawMaterial/exportRelDRExcel"}></DownloadBase>,
              ]
            }
            ref={downloadRef}
          ></WithModal>
        </div>
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
