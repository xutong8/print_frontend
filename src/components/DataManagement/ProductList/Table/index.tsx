import React, { useRef, useState } from "react";
import styles from "./index.module.less";
import {
  FilterCakeType,
  ProductSeriesType,
  RawMaterialType,
  SearchType,
} from "..";
import CustomTable from "@/components/Table";
import { Button } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import genColumns, { IRecord } from "./columns";
import { ProductEditRef } from "../../ProductEdit";
import Header from "@/components/Header";
import { ProductDetailRef } from "../../ProductDetail";
import Uploader, { UploaderRef } from "../Uploader";

export interface ITableProps {
  filterCake: FilterCakeType;
  productSeries: ProductSeriesType;
  rawMaterial: RawMaterialType;
  searchType: SearchType;
  searchField: string;
  searchCondition: string;
}

const Table: React.FC<ITableProps> = (props) => {
  const {
    filterCake,
    productSeries,
    rawMaterial,
    searchType,
    searchField,
    searchCondition,
  } = props;
  const baseUrl =
    searchType === SearchType.INDIRECT
      ? "/product/findAllByDirectCondition"
      : "/product/findAllByRelCondition";
  const [, setForceUpdate] = useState<{}>({});
  const editModalRef = useRef<ProductEditRef>(null);
  const previewModalRef = useRef<ProductDetailRef>(null);

  const query =
    searchType === SearchType.INDIRECT
      ? {
        conditionOfQuery: searchCondition,
        typeOfQuery: searchField,
      }
      : {
        filterCakeName: filterCake?.name ?? void 0,
        productSeriesName: productSeries?.name ?? void 0,
        rawMaterialName: rawMaterial?.name ?? void 0,
      };

  const uploaderRef = useRef<UploaderRef>(null);

  const handleUpload = () => {
    uploaderRef.current?.showModal();
  }

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <Header desc="产品列表" />
        <div className={styles.right}>
          <Button type="primary" icon={<UploadOutlined />} className={styles.upload} onClick={handleUpload}>
            上传
          </Button>
          <Uploader ref={uploaderRef}></Uploader>
          <Button type="primary" icon={<DownloadOutlined />} className={styles.download}>
            下载
          </Button>
        </div>
      </div>
      <div className={styles.main}>
        <CustomTable
          baseUrl={baseUrl}
          query={query}
          columns={genColumns(setForceUpdate, editModalRef, previewModalRef)}
          rowKey={(record: IRecord) => record.productId}
        />
      </div>
    </div>
  );
};

export default Table;
