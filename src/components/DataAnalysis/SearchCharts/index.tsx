import BasicBar from "@/components/Echarts/BasicBar";
import BasicLineChart from "@/components/Echarts/BasicLineChart";
import LineRace from "@/components/Echarts/LineRace";
import StackedAreaChart from "@/components/Echarts/StackedAreaChart";
import styles from './index.module.less'
import { SearchType } from "..";
import { IProductName } from "@/services/fetchProductNames";
import { useEffect } from "react";

export interface ISearchChartProps {
    searchType: SearchType;
    timeScale: string;
    singleCondition: IProductName | null | undefined;
    multiField: string;
    multiCondition: string;
}

const SearchChart: React.FC<ISearchChartProps> = (props) => {
    const { searchType, timeScale, singleCondition, multiField, multiCondition } = props;

    const base_url = searchType === SearchType.SINGLEPRODUCT ?
        "singleProduct/" :
        "multiProduct/"

    const query = searchType === SearchType.SINGLEPRODUCT ?
        {
            timeScale: timeScale,
            conditionOfQuery: singleCondition
        } :
        {
            timeScale: timeScale,
            typeOfQuery: multiField,
            conditionOfQuery: multiCondition
        }

    const fetchApiData = () => {
        console.log("query: ", query);
        //TO DO 从后端获取销量或者利润信息
    }

    useEffect(() => {
        fetchApiData();
    }, [searchType, timeScale, singleCondition, multiField, multiCondition, query]);

    //TO DO 根据真实数据修改组件的参数
    const renderSearchContent = () => {
        if (searchType === SearchType.MULTIPRODUCT) {
            return (
                <>
                    <LineRace title="销售量"></LineRace>
                    <StackedAreaChart title="利润"></StackedAreaChart>
                </>
            )
        }
        else {
            return (
                <>
                    <BasicLineChart title={"销售量"} datax={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} dataSeries={[150, 230, 224, 218, 135, 147, 260]}></BasicLineChart>
                    <BasicLineChart title={"利润"} datax={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} dataSeries={[150, 230, 224, 218, 135, 147, 260]}></BasicLineChart>
                </>
            )
        }
    }

    return (
        <>
            <div className={styles.chart}>
                {renderSearchContent()}
            </div>
        </>
    )
}

export default SearchChart;