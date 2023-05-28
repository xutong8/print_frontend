import BasicBar from "@/components/Echarts/BasicBar";
import BasicLineChart from "@/components/Echarts/BasicLineChart";
import LineRace from "@/components/Echarts/LineRace";
import StackedAreaChart, { ISeries } from "@/components/Echarts/StackedAreaChart";
import styles from './index.module.less'
import { SearchType } from "..";
import { IProductName } from "@/services/fetchProductNames";
import { useEffect, useRef, useState } from "react";
import { httpRequest } from "@/services";
import { nowDate } from "@/utils";
import { AxiosResponse, all } from "axios";
import { SALES_VOLUME } from "../Search/constants";
import Header from "@/components/Header";
import { Button } from "antd";
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import Uploader, { UploaderRef } from "./Uploader";
import WithModal, { WithModalRef } from "@/components/WithModal";
import DownloadBase from "@/components/DownloadBase";

export interface ISearchChartProps {
    searchType: SearchType;
    timeScale: string;
    singleCondition: IProductName | null | undefined;
    multiField: string;
    multiCondition: string;
}

export interface ISingleProductSales {
    endTime: string;
    number: number;
    productIndex: string;
    productName: string;
    profit: number;
    startTime: string;
}

export interface ISingleSalesResponse {
    code: number;
    data: {
        totalNum: number;
        totalProfit: number;
        list: ISingleProductSales[];
    };
    msg: string;
}

export interface ITopNSalesResponse {
    code: number;
    data: {
        topNum: number;
        productNum: number;
        productIndex: string;
        list: {
            totalNum: number;
            totalProfit: number;
            list: ISingleProductSales[];
        }[];
    }[];
    msg: string;
}

const SearchChart: React.FC<ISearchChartProps> = (props) => {
    const { searchType, timeScale, singleCondition, multiField, multiCondition } = props;
    const [singleList, setSingleList] = useState<ISingleProductSales[]>([]);
    const [topNdata, setTopNdata] = useState<(string | number)[][]>([]);
    const [productName, setProductName] = useState<string[]>([]);
    const [allDate, setAllDate] = useState<string[]>([]);
    const [series, setSeries] = useState<ISeries[]>([]);

    const base_url = searchType === SearchType.SINGLEPRODUCT ?
        "/Sales/getSingleProductSales" :
        "/Sales/findTopNSalesProduct";

    const query = searchType === SearchType.SINGLEPRODUCT ?
        {
            endTime: `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`,
            timeSpan: timeScale,
            productName: singleCondition?.name
        } :
        {
            endTime: `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`,
            timeSpan: timeScale,
            method: multiField === SALES_VOLUME ? 0 : 1,
            number: Number(multiCondition)
        }

    console.log("")

    const fetchApiData = async () => {
        if (!timeScale) {
            setSingleList([]);
            setTopNdata([]);
            setProductName([]);
            setAllDate([]);
            setSeries([]);
            return;
        }
        //TO DO 从后端获取销量或者利润信息
        if (searchType === SearchType.SINGLEPRODUCT) {
            const res = (await httpRequest.get(
                base_url,
                {
                    params: {
                        ...query
                    },
                }
            )) as AxiosResponse<ISingleSalesResponse>;
            const salesInfo = (res?.data ?? []) as ISingleSalesResponse;
            setSingleList(salesInfo.data.list)
        }
        else {
            const res = (await httpRequest.get(
                base_url,
                {
                    params: {
                        ...query
                    },
                }
            )) as AxiosResponse<ITopNSalesResponse>;
            const salesInfo = (res?.data ?? []) as ITopNSalesResponse;
            const temp = salesInfo.data.map(item => item.list.map(item1 => item1.list));
            const salesList: ISingleProductSales[][] = [];
            const tempProductName: string[] = [];
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < temp[i].length; j++) {
                    salesList.push(temp[i][j]);
                    tempProductName.push(temp[i][j][0].productName);
                }
            }
            let tempData: (string | number)[][] = [["Product", "Date", "Sales"]]
            salesList.map(item => {
                item.map(e => {
                    tempData.push([e.productName, e.endTime, e.number]);
                })
            })
            let tempDate: string[] = [];
            salesList[0].map(item => {
                tempDate.push(item.endTime);
            })
            let tempSeries: ISeries[] = [];
            salesList.map(item => {
                tempSeries.push({
                    name: item[0].productName,
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [...item.map(e => e.number)]
                })
            })
            setSeries(tempSeries);
            setAllDate(tempDate);
            setTopNdata(tempData);
            setProductName(tempProductName)
        }
    }

    useEffect(() => {
        fetchApiData();
    }, [searchType, timeScale, singleCondition, multiField, multiCondition]);

    //TO DO 根据真实数据修改组件的参数
    const renderSearchContent = () => {
        if (searchType === SearchType.MULTIPRODUCT) {
            return (
                <>
                    <LineRace
                        title="销售量"
                        data={topNdata}
                        productName={productName}
                    ></LineRace>
                    <StackedAreaChart
                        title="毛收入"
                        productName={productName}
                        allDate={allDate}
                        series={series}
                    ></StackedAreaChart>
                </>
            )
        }
        else {
            return (
                <>
                    <BasicLineChart title={"销售量"} datax={singleList.map(item => item.endTime)} dataSeries={singleList.map(item => item.number)}></BasicLineChart>
                    <BasicLineChart title={"毛收入"} datax={singleList.map(item => item.endTime)} dataSeries={singleList.map(item => item.profit)}></BasicLineChart>
                </>
            )
        }
    }

    const uploaderRef = useRef<UploaderRef>(null);
    const downloadRef = useRef<WithModalRef>(null);

    const handleUpload = () => {
        uploaderRef.current?.showModal();
    }

    const handleDownload = () => {
        downloadRef.current?.showModal();
    }

    return (
        <div className={styles.table}>
            <div className={styles.header}>
                <Header desc="数据分析" />
                <div className={styles.right}>
                    <Button type="primary" icon={<UploadOutlined />} className={styles.upload} onClick={handleUpload}>
                        上传
                    </Button>
                    <Uploader ref={uploaderRef}></Uploader>
                    <Button type="primary" icon={<DownloadOutlined />} className={styles.download} onClick={handleDownload}>
                        下载
                    </Button>
                    <WithModal
                        componentList={
                            [
                                <DownloadBase text={"下载销售信息"} url={"Sales/exportExcel"}></DownloadBase>,
                            ]
                        }
                        ref={downloadRef}
                    ></WithModal>
                </div>
            </div>
            <div className={styles.chart}>
                {renderSearchContent()}
            </div>
        </div>
    )
}

export default SearchChart;