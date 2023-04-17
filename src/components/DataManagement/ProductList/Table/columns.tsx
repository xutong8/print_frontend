import { ColumnsType } from "antd/es/table";
import styles from './index.module.less';

export interface IRecord {
  productId: string;
  productName: string;
  productIndex: string;
  productCode: string;
  productSeriesName: string;
  productColor: string;
};

const columns: ColumnsType<IRecord> = [
  {
    title: '序号',
    dataIndex: 'productId',
    key: 'productId'
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName'
  },
  {
    title: '产品编号',
    dataIndex: 'productIndex',
    key: 'productIndex'
  },
  {
    title: '产品代码',
    dataIndex: 'productCode',
    key: 'productCode'
  },
  {
    title: '产品系列',
    dataIndex: 'productSeriesName',
    key: 'productSeriesName'
  },
  {
    title: '产品颜色',
    dataIndex: 'productColor',
    key: 'productColor'
  },
  {
    title: '产品单价',
    dataIndex: 'productUnitPrice',
    key: 'productUnitPrice'
  },
  {
    title: '近期涨幅',
    dataIndex: 'productPriceIncreasePercent',
    key: 'productPriceIncreasePercent'
  },
  {
    title: '附加信息',
    dataIndex: 'productRemarks',
    key: 'productRemarks'
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'action',
    render: (record) => {
      return (
        <div className={styles.action}>
          <div className={styles.text}>删除</div>
          <div className={styles.text}>编辑</div>
          <div className={styles.text}>查看详细信息</div>
        </div>
      )
    }
  }
];

export default columns;