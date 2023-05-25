import * as echarts from 'echarts';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { PureComponent } from 'react';
import styles from './index.module.less';

var ROOT_PATH = 'https://echarts.apache.org/examples';
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;

function run(_rawData: any, myChart: echarts.ECharts, title: string | undefined, productName: string[]) {
    const products = productName;
    const datasetWithFilters: echarts.DatasetComponentOption[] = [];
    const seriesList: echarts.SeriesOption[] = [];
    echarts.util.each(products, function (product) {
        var datasetId = 'dataset_' + product;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
                type: 'filter',
                config: {
                    and: [
                        { dimension: 'Product', '=': product }
                    ]
                }
            }
        });
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: product,
            endLabel: {
                show: true,
                formatter: function (params: any) {
                    return params.value[0] + ': ' + params.value[2];
                }
            },
            labelLayout: {
                moveOverlap: 'shiftY'
            },
            emphasis: {
                focus: 'series'
            },
            encode: {
                x: 'Date',
                y: 'Sales',
                label: ['Product', 'Sales'],
                itemName: 'Date',
                tooltip: ['Sales']
            }
        });
    });

    option = {
        animationDuration: 5000,
        dataset: [
            {
                id: 'dataset_raw',
                source: _rawData
            },
            ...datasetWithFilters
        ],
        title: {
            text: title ?? '',
            left: '50%',
            bottom: 0,
        },
        tooltip: {
            order: 'valueDesc',
            trigger: 'axis'
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            nameLocation: 'middle',
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            name: '销售量'
        },
        grid: {
            right: 140
        },
        series: seriesList
    };

    myChart.setOption(option);
}

interface ILineRace {
    title?: string;
    data: (string | number)[][];
    productName: string[];
}

const LineRace: React.FC<ILineRace> = (props) => {
    const chartDom: any = useRef();
    const { title, data, productName } = props;
    useEffect(
        () => {
            const myChart = echarts.init(chartDom.current);
            run(data, myChart, title, productName);
        }
    )
    return <div
        className={styles.chart}
        ref={chartDom}
    ></div>
}

export default LineRace;

