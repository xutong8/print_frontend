import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

export interface ICustomTableProps<T> {
  columns: ColumnsType<T>,
  dataSource: T[]
}

const CustomTable = <T extends object>(props: ICustomTableProps<T>) => {
  const { columns, dataSource } = props;
  return (
    <Table columns={columns} dataSource={dataSource} />
  )
};

export default CustomTable;