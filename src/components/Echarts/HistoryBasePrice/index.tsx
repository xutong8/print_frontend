import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import styles from './index.module.less'

type EChartsOption = echarts.EChartsOption;
interface IProps {
    datax: Array<string>;
    dataSeries: Array<number>;
}

const HistoryBasePrice: React.FC<IProps> = (props) => {
    const chartDom: any = useRef();
    let existInstance = echarts.getInstanceByDom(chartDom);
    if (existInstance)
        echarts.dispose(existInstance);
    useEffect(() => {
        const myChart = echarts.init(chartDom.current);
        let option: EChartsOption = {
            xAxis: {
                type: 'category',
                data: props.datax,
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
            <div ref={chartDom} className={styles.history_price}></div>
        </>
    );
}

export default HistoryBasePrice;