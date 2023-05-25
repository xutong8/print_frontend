import * as echarts from 'echarts';
import { useEffect, useLayoutEffect, useRef } from 'react';
import styles from './index.module.less';

export interface ISeries {
    name: string,
    type: string,
    stack: string,
    areaStyle: {},
    emphasis: {
        focus: 'series'
    },
    data: number[]
}

export interface IStackedAreaChart {
    title?: string;
    productName: string[];
    allDate: string[];
    series: ISeries[];
}

const StackedAreaChart: React.FC<IStackedAreaChart> = (props) => {
    const chartDom: any = useRef();
    const { title, productName, allDate, series } = props;

    const option = {
        title: {
            text: title ?? '',
            left: '50%',
            bottom: -5,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        //TO DO 从返回的数据中获取所有的产品名
        legend: {
            data: productName
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                //TO DO 从返回的数据中获取日期数据
                data: allDate
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        //TO DO这里做一个映射
        series: series
    };
    useEffect(
        () => {
            const myChart = echarts.init(chartDom.current);
            myChart.setOption(option);
        }
    )

    return (
        <div className={styles.chart} ref={chartDom} ></div>
    )
}

export default StackedAreaChart;

