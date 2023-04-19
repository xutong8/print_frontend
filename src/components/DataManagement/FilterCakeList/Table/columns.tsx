import { ColumnsType } from "antd/es/table";
import styles from "./index.module.less";
import { unitPriceFormat } from "@/utils";
import ChangeRatio from "@/components/ChangeRatio";
import { deleteFilterCakeById } from "@/services/deleteFilterCakeById";
import { message } from "antd";
import { Dispatch, RefObject, SetStateAction } from "react";
import FilterCakeEdit, { FilterCakeEditRef } from "../../FilterCakeEdit";
import { fetchFilterCakeById } from "@/services/fetchFilterCakeById";

export interface IRecord {
  filterCakeId: string;
  filterCakeName: string;
  filterCakeIndex: string;
  filterCakeColor: string;
  filterCakeUnitPrice: number;
  filterCakePriceIncreasePercent: number;
  filterCakeSpecification: string;
  filterCakeRemarks: string;
}

const genColumns = (
  setForceUpdate: Dispatch<SetStateAction<{}>>,
  editModalRef: RefObject<FilterCakeEditRef>
) => {
  const columns: ColumnsType<IRecord> = [
    {
      title: "序号",
      dataIndex: "filterCakeId",
      key: "filterCakeId",
    },
    {
      title: "滤饼名称",
      dataIndex: "filterCakeName",
      key: "filterCakeName",
    },
    {
      title: "滤饼编号",
      dataIndex: "filterCakeIndex",
      key: "filterCakeIndex",
    },
    {
      title: "滤饼颜色",
      dataIndex: "filterCakeColor",
      key: "filterCakeColor",
    },
    {
      title: "滤饼单价",
      dataIndex: "filterCakeUnitPrice",
      key: "filterCakeUnitPrice",
      render: (value: number) => {
        return <div>{unitPriceFormat(value)}</div>;
      },
    },
    {
      title: "近期涨幅",
      dataIndex: "filterCakePriceIncreasePercent",
      key: "filterCakePriceIncreasePercent",
      width: 120,
      render: (value: number) => {
        return <ChangeRatio value={value} />;
      },
    },
    {
      title: "规格",
      dataIndex: "filterCakeSpecification",
      key: "filterCakeSpecification",
    },
    {
      title: "附加信息",
      dataIndex: "filterCakeRemarks",
      key: "filterCakeRemarks",
    },
    {
      title: "操作",
      dataIndex: "",
      key: "action",
      render: (record: IRecord) => {
        // 处理删除逻辑
        const handleDelFilterCake = async () => {
          try {
            await deleteFilterCakeById(record.filterCakeId);
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
        const handleEditFilterCake = async () => {
          editModalRef.current?.setShowModal(false);
          const filterCake = await fetchFilterCakeById(record.filterCakeId);
          editModalRef.current?.setFilterCake(filterCake);
          editModalRef.current?.setShowModal(true);
        };

        return (
          <div className={styles.action}>
            <div className={styles.text} onClick={handleDelFilterCake}>
              删除
            </div>
            <div className={styles.text} onClick={handleEditFilterCake}>
              编辑
            </div>
            <div className={styles.text}>查看详细信息</div>
            <FilterCakeEdit ref={editModalRef} />
          </div>
        );
      },
    },
  ];
  return columns;
};

export default genColumns;
