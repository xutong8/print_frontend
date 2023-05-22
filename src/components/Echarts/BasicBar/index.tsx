import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import styles from './index.module.less';

const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
        }
    ]
};

const BasicBar = () => {
    const chartDom: any = useRef();
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

export default BasicBar;

