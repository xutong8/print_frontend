import { ColumnsType } from "antd/es/table";
import styles from "./index.module.less";
import { checkPermission, unitPriceFormat } from "@/utils";
import ChangeRatio from "@/components/ChangeRatio";
import { Dispatch, RefObject, SetStateAction } from "react";
import { deleteRawMaterialById } from "@/services/deleteRawMaterialById";
import { message } from "antd";
import { fetchRawMaterialById } from "@/services/fetchRawMaterialById";
import RawMaterialEdit, { RawMaterialEditRef } from "../../RawMaterialEdit";
import RawMaterialDetail, {
  RawMaterialDetailRef,
} from "../../RawMaterialDetail";
import { MANAGER } from "@/constants/data-management";

export interface IRecord {
  rawMaterialId: string;
  rawMaterialName: string;
  rawMaterialIndex: string;
  rawMaterialConventional: string;
  rawMaterialUnitPrice: number;
  rawMaterialIncreasePercent: number;
  rawMaterialSpecification: string;
}
const genColumns = (
  setForceUpdate: Dispatch<SetStateAction<{}>>,
  editModalRef: RefObject<RawMaterialEditRef>,
  previewModalRef: RefObject<RawMaterialDetailRef>
) => {
  const columns: ColumnsType<IRecord> = [
    {
      title: "序号",
      dataIndex: "rawMaterialId",
      key: "rawMaterialId",
    },
    {
      title: "原料品名",
      dataIndex: "rawMaterialName",
      key: "rawMaterialName",
    },
    {
      title: "存货编号",
      dataIndex: "rawMaterialIndex",
      key: "rawMaterialIndex",
    },
    {
      title: "是否为常规原料",
      dataIndex: "rawMaterialConventional",
      key: "rawMaterialConventional",
    },
    {
      title: "原料单价",
      dataIndex: "rawMaterialUnitPrice",
      key: "rawMaterialUnitPrice",
      render: (value: number) => {
        return <div>{unitPriceFormat(value)}</div>;
      },
    },
    {
      title: "近期涨幅",
      dataIndex: "rawMaterialIncreasePercent",
      key: "rawMaterialIncreasePercent",
      width: 120,
      render: (value: number) => {
        return <ChangeRatio value={value} />;
      },
    },
    {
      title: "规格",
      dataIndex: "rawMaterialSpecification",
      key: "rawMaterialSpecification",
    },
    {
      title: "操作",
      dataIndex: "",
      key: "action",
      render: (record: IRecord) => {
        // 处理删除逻辑
        const handleDelRawMaterial = async () => {
          //判断用户权限
          if (!checkPermission(MANAGER))
            return;
          try {
            await deleteRawMaterialById(record.rawMaterialId);
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
        const handleEditRawMaterial = async () => {
          //判断用户权限
          if (!checkPermission(MANAGER))
            return;
          editModalRef.current?.setShowModal(false);
          const rawMaterial = await fetchRawMaterialById(record.rawMaterialId);
          editModalRef.current?.setRawMaterial(rawMaterial);
          editModalRef.current?.setShowModal(true);
        };

        // 查看详情
        const handlePreviewRawMaterial = async () => {
          previewModalRef.current?.setShowModal(false);
          const rawMaterial = await fetchRawMaterialById(record.rawMaterialId);
          previewModalRef.current?.setRawMaterial(rawMaterial);
          previewModalRef.current?.setShowModal(true);
        };

        return (
          <div className={styles.action}>
            <div className={styles.text} onClick={handleDelRawMaterial}>
              删除
            </div>
            <div className={styles.text} onClick={handleEditRawMaterial}>
              编辑
            </div>
            <div className={styles.text} onClick={handlePreviewRawMaterial}>
              查看详细信息
            </div>
            <RawMaterialEdit ref={editModalRef} />
            <RawMaterialDetail ref={previewModalRef} />
          </div>
        );
      },
    },
  ];
  return columns;
};

export default genColumns;
