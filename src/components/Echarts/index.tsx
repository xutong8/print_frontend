import * as echarts from 'echarts';
import React from 'react';
import { PureComponent } from 'react';

var ROOT_PATH = 'https://echarts.apache.org/examples';
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;

const data = [[]];
function run(_rawData: any, myChart: echarts.ECharts) {
    // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
    const countries = [
        'Finland',
        'France',
        'Germany',
        'Iceland',
        'Norway',
        'Poland',
        'Russia',
        'United Kingdom'
    ];
    const datasetWithFilters: echarts.DatasetComponentOption[] = [];
    const seriesList: echarts.SeriesOption[] = [];
    echarts.util.each(countries, function (country) {
        var datasetId = 'dataset_' + country;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
                type: 'filter',
                config: {
                    and: [
                        { dimension: 'Year', gte: 1950 },
                        { dimension: 'Country', '=': country }
                    ]
                }
            }
        });
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: country,
            endLabel: {
                show: true,
                formatter: function (params: any) {
                    return params.value[3] + ': ' + params.value[0];
                }
            },
            labelLayout: {
                moveOverlap: 'shiftY'
            },
            emphasis: {
                focus: 'series'
            },
            encode: {
                x: 'Year',
                y: 'Income',
                label: ['Country', 'Income'],
                itemName: 'Year',
                tooltip: ['Income']
            }
        });
    });

    option = {
        animationDuration: 10000,
        dataset: [
            {
                id: 'dataset_raw',
                source: _rawData
            },
            ...datasetWithFilters
        ],
        title: {
            text: 'Income of Germany and France since 1950'
        },
        tooltip: {
            order: 'valueDesc',
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            nameLocation: 'middle'
        },
        yAxis: {
            name: 'Income'
        },
        grid: {
            right: 140
        },
        series: seriesList
    };

    myChart.setOption(option);
}
class ProductSales extends PureComponent {
    chartDom: any = React.createRef();

    componentDidMount(): void {
        var myChart = echarts.init(this.chartDom.current);
        run(data, myChart);
    }

    render() {
        return (<div
            style={{ width: 1600, height: 1000 }}
            ref={this.chartDom}
        ></div>)
    }
}

export default ProductSales;