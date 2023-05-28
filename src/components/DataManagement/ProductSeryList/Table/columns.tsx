import { ColumnsType } from "antd/es/table";
import styles from "./index.module.less";
import { checkPermission, unitPriceFormat } from "@/utils";
import { Popconfirm, message } from "antd";
import { Dispatch, RefObject, SetStateAction } from "react";
import { MANAGER } from "@/constants/data-management";
import { ProductSeriesEditRef } from "../../ProductSeryEdit";
import { ProductSeriesDetailRef } from "../../ProductSeryDetail";
import { deleteProductSeriesById } from "@/services/deleteProductSeriesById";
import { fetchProductSeriesById } from "@/services/fetchProductSeriesById";
import { fetchProductNames } from "@/services/fetchProductNames";
import ProductSeriesEdit from "../../ProductSeryEdit";
import ProductSeriesDetail from "../../ProductSeryDetail"

export interface IRecord {
  productSeriesId: string;
  productSeriesName: string;
  productSeriesFunction: string;
}

const genColumns = (
  setForceUpdate: Dispatch<SetStateAction<{}>>,
  editModalRef: RefObject<ProductSeriesEditRef>,
  previewModalRef: RefObject<ProductSeriesDetailRef>
) => {
  const columns: ColumnsType<IRecord> = [
    {
      title: "序号",
      dataIndex: "productSeriesId",
      key: "productSeriesId",
    },
    {
      title: "系列名称",
      dataIndex: "productSeriesName",
      key: "productSeriesName",
    },
    {
      title: "功能描述",
      dataIndex: "productSeriesFunction",
      key: "productSeriesFunction",
    },
    {
      title: "操作",
      dataIndex: "",
      key: "action",
      render: (record: IRecord) => {

        // 处理删除逻辑
        const handleDelProductSeries = async () => {
          if (!checkPermission(MANAGER))
            return;
          try {
            await deleteProductSeriesById(record.productSeriesId);
            message.open({
              type: "success",
              content: "删除成功!",
            });
            setForceUpdate({});
          } catch (err) {
            message.open({
              type: "error",
              content: "删除失败!",
            });
          }
        };

        // 处理编辑逻辑
        const handleEditProductSeries = async () => {
          //判断用户权限
          if (!checkPermission(MANAGER))
            return;
          editModalRef.current?.setShowModal(false);
          const [productSeries, products] = await Promise.all([
            fetchProductSeriesById(record.productSeriesId),
            fetchProductNames(),
          ]);
          editModalRef.current?.setProducts(products);
          editModalRef.current?.setProductSeries(productSeries);
          editModalRef.current?.setShowModal(true);
        };

        // 查看详情
        const handlePreviewProductSeries = async () => {
          previewModalRef.current?.setShowModal(false);
          const productSeries = await fetchProductSeriesById(record.productSeriesId);
          previewModalRef.current?.setProductSeries(productSeries);
          previewModalRef.current?.setShowModal(true);
        };

        return (
          <div className={styles.action}>
            <Popconfirm
              title="删除产品"
              description="是否要删除这项产品?"
              okText="是"
              cancelText="否"
              onConfirm={handleDelProductSeries}
            >
              <div className={styles.text}>删除</div>
            </Popconfirm>
            <div className={styles.text} onClick={handleEditProductSeries}>
              编辑
            </div>
            <div className={styles.text} onClick={handlePreviewProductSeries}>
              查看详细信息
            </div>
            <ProductSeriesEdit ref={editModalRef} setForceUpdate={setForceUpdate} />
            <ProductSeriesDetail ref={previewModalRef} />
          </div>
        );
      },
    },
  ];
  return columns;
};

export default genColumns;
