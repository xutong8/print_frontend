import React, { ReactNode, SetStateAction, useState } from "react";
import styles from "./index.module.less";
import { FilterCakeType } from "../FilterCakeEdit";
import { unitPriceFormat } from "@/utils";
import { Button, Group, RadioChangeEvent } from "antd/es/radio";
import { Table } from "antd";
import { IFilterCakeSimple } from "@/services/fetchFilterCakeById";
import { IRawMaterialSimple } from "@/services/fetchProductById";
import HistoryBasePrice from "@/components/Echarts/HistoryBasePrice";
import { fetchFCakeHistoryPriceById } from "@/services/fetchFCakeHistoryPrice";
import { IHistoryPriceSimple } from "@/services/fetchRawMaterialById";
import { ProductSeriesType } from "../ProductSeryEdit";
import { IProductSimple } from "@/services/fetchProductSeriesById";

export interface IProductSeriesBaseDetailProps {
    productSeries: ProductSeriesType;
}

const RELATION_DETAIL = "关联信息";


// 产品关联表columns
const pdRelationColumns = [
    {
        title: "产品序号",
        dataIndex: "productSeriesId",
        key: "productSeriesId",
    },
    {
        title: "产品名称",
        dataIndex: "productSeriesName",
        key: "productSeriesName",
    },
];


const ProductSeriesBaseDetail: React.FC<IProductSeriesBaseDetailProps> = (props) => {
    const { productSeries } = props;

    // 选项列表
    const options = [RELATION_DETAIL];
    // 选中的选项
    const [selectedOption, setSelectedOption] = useState<string>(RELATION_DETAIL);

    const handleGroupChange = async (event: RadioChangeEvent) => {
        setSelectedOption(event.target.value);
        // if (event.target.value === HISTORY_PRICE) {
        //     const res = await fetchFCakeHistoryPriceById({
        //         //TO DO 这里后续有真实数据之后要用选定的ID
        //         // filterCakeId: filterCake?.filterCakeId as number,
        //         filterCakeId: 1002,
        //         months: 12,
        //     }) as IHistoryPriceSimple[];
        //     setHistoryPriceList(res.reverse());
        // }
    }


    const renderOption = (option: string) => {
        switch (option) {
            case RELATION_DETAIL: {
                return (
                    <div className={styles.relation}>
                        <Table
                            columns={pdRelationColumns}
                            dataSource={productSeries?.productSimpleList ?? []}
                            rowKey={(record: IProductSimple) => record.productId}
                        />
                    </div>
                );
            }
            default: {
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                {/* 滤饼名称 */}
                <div className={styles.base}>
                    <p className={styles.field}>系列名称：</p>
                    <p className={styles.value}>{productSeries?.productSeriesName ?? ""}</p>
                </div>
                {/* 滤饼编号 */}
                <div className={styles.base}>
                    <p className={styles.field}>产品功能：</p>
                    <p className={styles.value}>{productSeries?.productSeriesFunction ?? ""}</p>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.options}>
                    <Group
                        value={selectedOption}
                        onChange={handleGroupChange}
                    >
                        {options.map((option) => (
                            <Button value={option} key={option}>
                                {option}
                            </Button>
                        ))}
                    </Group>
                </div>
                {renderOption(selectedOption)}
            </div>
        </div>
    );
};

export default ProductSeriesBaseDetail;
