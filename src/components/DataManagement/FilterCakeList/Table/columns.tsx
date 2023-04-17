import { ColumnsType } from "antd/es/table";
import styles from './index.module.less';
import { unitPriceFormat } from "@/utils";
import ChangeRatio from "@/components/ChangeRatio";

export interface IRecord {
  filterCakeId: string;
  filterCakeName: string;
  filterCakeIndex: string;
  filterCakeColor: string;
  filterCakeUnitPrice: number;
  filterCakePriceIncreasePercent: number;
  filterCakeSpecification: string;
  filterCakeRemarks: string;
};

const columns: ColumnsType<IRecord> = [
  {
    title: '序号',
    dataIndex: 'filterCakeId',
    key: 'filterCakeId'
  },
  {
    title: '滤饼名称',
    dataIndex: 'filterCakeName',
    key: 'filterCakeName'
  },
  {
    title: '滤饼编号',
    dataIndex: 'filterCakeIndex',
    key: 'filterCakeIndex'
  },
  {
    title: '滤饼颜色',
    dataIndex: 'filterCakeColor',
    key: 'filterCakeColor'
  },
  {
    title: '滤饼单价',
    dataIndex: 'filterCakeUnitPrice',
    key: 'filterCakeUnitPrice',
    render: (value: number) => {
      return (
        <div>{unitPriceFormat(value)}</div>
      )
    }
  },
  {
    title: '近期涨幅',
    dataIndex: 'filterCakePriceIncreasePercent',
    key: 'filterCakePriceIncreasePercent',
    width: 120,
    render: (value: number) => {
      return (
        <ChangeRatio value={value} />
      )
    }
  },
  {
    title: '规格',
    dataIndex: 'filterCakeSpecification',
    key: 'filterCakeSpecification'
  },
  {
    title: '附加信息',
    dataIndex: 'filterCakeRemarks',
    key: 'filterCakeRemarks'
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