import React, { useRef, useState } from "react";
import styles from "./index.module.less";
import CustomTable from "@/components/Table";
import { Button } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import genColumns, { IRecord } from "./columns";
import Header from "@/components/Header";
import { ProductSeriesEditRef } from "../../ProductSeryEdit";
import { ProductSeriesDetailRef } from "../../ProductSeryDetail";
import Uploader, { UploaderRef } from "../Uploader";
import WithModal, { WithModalRef } from "@/components/WithModal";
import DownloadBase from "@/components/DownloadBase";

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
        <Header desc="产品系列表" />
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
                <DownloadBase text={"下载产品系列信息"} url={"productSeries/exportExcel"}></DownloadBase>,
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
          rowKey={(record: IRecord) => record.productSeriesId}
        />
      </div>
    </div>
  );
};

export default Table;
