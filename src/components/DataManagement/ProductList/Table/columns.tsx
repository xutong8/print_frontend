import { ColumnsType } from "antd/es/table";
import styles from "./index.module.less";
import { deleteProductById } from "@/services/deleteProductById";
import { Popconfirm, message } from "antd";
import { Dispatch, RefObject, SetStateAction } from "react";
import ChangeRatio from "@/components/ChangeRatio";
import { unitPriceFormat } from "@/utils";
import ProductEdit, { ProductEditRef } from "../../ProductEdit";
import { fetchProductById } from "@/services/fetchProductById";
import { fetchAllProductSeries } from "@/services/fetchProductSeries";

export interface IRecord {
  productId: string;
  productName: string;
  productIndex: string;
  productCode: string;
  productSeriesName: string;
  productColor: string;
}

const genColumns = (
  setForceUpdate: Dispatch<SetStateAction<{}>>,
  editModalRef: RefObject<ProductEditRef>
) => {
  const columns: ColumnsType<IRecord> = [
    {
      title: "序号",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "产品名称",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "产品编号",
      dataIndex: "productIndex",
      key: "productIndex",
    },
    {
      title: "产品代码",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "产品系列",
      dataIndex: "productSeriesName",
      key: "productSeriesName",
    },
    {
      title: "产品颜色",
      dataIndex: "productColor",
      key: "productColor",
    },
    {
      title: "产品单价",
      dataIndex: "productUnitPrice",
      key: "productUnitPrice",
      render: (value: number) => {
        return <div>{unitPriceFormat(value)}</div>;
      },
    },
    {
      title: "近期涨幅",
      dataIndex: "productPriceIncreasePercent",
      key: "productPriceIncreasePercent",
      width: 120,
      render: (value: number) => {
        return <ChangeRatio value={value} />;
      },
    },
    {
      title: "附加信息",
      dataIndex: "productRemarks",
      key: "productRemarks",
    },
    {
      title: "操作",
      dataIndex: "",
      key: "action",
      render: (record: IRecord) => {
        // 处理删除逻辑
        const handleDelProduct = async () => {
          try {
            await deleteProductById(record.productId);
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
        const handleEdit = async () => {
          editModalRef.current?.setShowModal(false);
          const [product, series] = await Promise.all([
            fetchProductById(record.productId),
            fetchAllProductSeries()
          ]);
          editModalRef.current?.setProduct(product);
          editModalRef.current?.setSeries(series);
          editModalRef.current?.setShowModal(true);
        };

        return (
          <div className={styles.action}>
            <Popconfirm
              title="删除产品"
              description="是否要删除这项产品?"
              okText="是"
              cancelText="否"
              onConfirm={handleDelProduct}
            >
              <div className={styles.text}>删除</div>
            </Popconfirm>
            <div className={styles.text} onClick={handleEdit}>
              编辑
            </div>
            <div className={styles.text}>查看详细信息</div>
            <ProductEdit ref={editModalRef} />
          </div>
        );
      },
    },
  ];
  return columns;
};

export default genColumns;
