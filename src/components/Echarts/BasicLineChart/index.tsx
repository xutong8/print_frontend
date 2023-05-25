import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import styles from './index.module.less'

type EChartsOption = echarts.EChartsOption;
interface IProps {
    datax: Array<string>;
    dataSeries: Array<number>;
    title?: string;
}

const BasicLineChart: React.FC<IProps> = (props) => {
    const { datax, dataSeries, title } = props;
    const chartDom: any = useRef();
    useEffect(() => {
        const myChart = echarts.init(chartDom.current);
        let option: EChartsOption = {
            title: {
                text: title ?? '',
                left: '50%',
                bottom: 0,
            },
            tooltip: {
                trigger: 'axis',
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: props.datax,
                axisTick: {
                    alignWithLabel: true
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: props.dataSeries,
                    type: 'line'
                }
            ]
        };
        myChart.setOption(option);
    }, [props]);

    return (
        <>
            <div ref={chartDom} className={styles.chart}></div>
        </>
    );
}

export default BasicLineChart;