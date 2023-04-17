import { httpRequest } from "@/services";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export interface ICustomTableProps<T> {
  columns: ColumnsType<T>;
  baseUrl: string;
  query: {
    [key: string]: number | string | undefined;
  };
  rowKey: (record: T) => string;
}

export interface Base<T> {
  pageNo: number;
  pageNum: number;
  pageSize: number;
  list: T[];
  total: number;
}

// 默认页码
const DEFAUTL_PAGE_NO = 1;
// 默认页的大小
const DEFAULT_PAGE_SIZE = 10;
// 总数
const DEFAULT_TOTAL = 10;

const CustomTable = <T extends object>(props: ICustomTableProps<T>) => {
  const { columns, baseUrl, query, rowKey } = props;

  // 加载器
  const [loading, setLoading] = useState<boolean>(false);
  // 页码
  const [pageNo, setPageNo] = useState<number>(DEFAUTL_PAGE_NO);
  // 页的大小
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  // 总数
  const [total, setTotal] = useState<number>(DEFAULT_TOTAL);

  // 页码和页大小change事件
  const handlePageNoChange = (config: TablePaginationConfig) => {
    setPageNo(config.current ?? DEFAUTL_PAGE_NO);
    setPageSize(config.pageSize ?? DEFAULT_PAGE_SIZE);
  };

  // 表格数据
  const [dataSource, setDataSource] = useState<T[]>([]);
  // 获取表格数据
  const fetchApiData = async () => {
    setLoading(true);
    const { data } = (await httpRequest.get(baseUrl, {
      params: {
        pageSize,
        pageNo,
        ...query,
      },
    })) as AxiosResponse<Base<T>>;
    setLoading(false);
    setDataSource(data?.list ?? []);
    setPageNo(data?.pageNo ?? DEFAUTL_PAGE_NO);
    setPageSize(data?.pageSize ?? DEFAULT_PAGE_SIZE);
    setTotal(data?.total ?? DEFAULT_TOTAL);
  };

  useEffect(() => {
    fetchApiData();
  }, [pageSize, pageNo, baseUrl, query]);

  return (
    <Table
      rowSelection={{
        type: "checkbox",
      }}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={{
        pageSize,
        total,
        current: pageNo,
        showSizeChanger: true,
      }}
      onChange={handlePageNoChange}
      rowKey={rowKey}
    />
  );
};

export default CustomTable;
