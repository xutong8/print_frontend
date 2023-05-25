import { ColumnsType } from "antd/es/table";
import styles from "./index.module.less";
import { checkPermission, unitPriceFormat } from "@/utils";
import ChangeRatio from "@/components/ChangeRatio";
import { deleteFilterCakeById } from "@/services/deleteFilterCakeById";
import { Popconfirm, message } from "antd";
import { Dispatch, RefObject, SetStateAction } from "react";
import FilterCakeEdit, { FilterCakeEditRef } from "../../FilterCakeEdit";
import { fetchFilterCakeById } from "@/services/fetchFilterCakeById";
import { fetchAllRawMaterials } from "@/services/fetchRawMaterials";
import { fetchAllFilterCakes } from "@/services/fetchFilterCakes";
import FilterCakeDetail, { FilterCakeDetailRef } from "../../FilterCakeDetail";
import { MANAGER } from "@/constants/data-management";

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
  editModalRef: RefObject<FilterCakeEditRef>,
  previewModalRef: RefObject<FilterCakeDetailRef>
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
          if (!checkPermission(MANAGER))
            return;
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
          //判断用户权限
          if (!checkPermission(MANAGER))
            return;
          editModalRef.current?.setShowModal(false);
          const [filterCake, rawMaterials, filterCakes] = await Promise.all([
            fetchFilterCakeById(record.filterCakeId),
            fetchAllRawMaterials(),
            fetchAllFilterCakes(),
          ]);
          editModalRef.current?.setRawMaterials(rawMaterials);
          editModalRef.current?.setFilterCakes(filterCakes);
          editModalRef.current?.setFilterCake(filterCake);
          editModalRef.current?.setShowModal(true);
        };

        // 查看详情
        const handlePreviewFilterCake = async () => {
          previewModalRef.current?.setShowModal(false);
          const filterCake = await fetchFilterCakeById(record.filterCakeId);
          previewModalRef.current?.setFilterCake(filterCake);
          previewModalRef.current?.setShowModal(true);
        };

        return (
          <div className={styles.action}>
            <Popconfirm
              title="删除产品"
              description="是否要删除这项产品?"
              okText="是"
              cancelText="否"
              onConfirm={handleDelFilterCake}
            >
              <div className={styles.text}>删除</div>
            </Popconfirm>
            <div className={styles.text} onClick={handleEditFilterCake}>
              编辑
            </div>
            <div className={styles.text} onClick={handlePreviewFilterCake}>
              查看详细信息
            </div>
            <FilterCakeEdit ref={editModalRef} />
            <FilterCakeDetail ref={previewModalRef} />
          </div>
        );
      },
    },
  ];
  return columns;
};

export default genColumns;
