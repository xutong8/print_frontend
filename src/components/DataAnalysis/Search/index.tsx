import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./index.module.less";
import { Button, Select, TreeSelect, message } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";
import { SearchType } from '../'
import { IProductName, fetchProductNames } from "@/services/fetchProductNames";
import { GROSS_INCOME, SALES_VOLUME } from "./constants";

export interface ISearchProps {
    searchType: SearchType;
    setSearchType: (searchType: SearchType) => void;
    timeScale: string;
    setTimeScale: (timeScale: string) => void;
    singleCondition: IProductName | null | undefined;
    setSingleCondition: (singleCondition: IProductName | null | undefined) => void;
    multiField: string;
    setMultiField: (multiField: string) => void;
    multiCondition: string;
    setMultiCondition: (multiCondition: string) => void;
}

const Search: React.FC<ISearchProps> = (props) => {
    const {
        searchType,
        setSearchType,
        timeScale,
        setTimeScale,
        singleCondition,
        setSingleCondition,
        multiField,
        setMultiField,
        multiCondition,
        setMultiCondition,
    } = props;

    const searchTypes = [
        { value: SearchType.SINGLEPRODUCT, title: "单产品查询" },
        { value: SearchType.MULTIPRODUCT, title: "TopN查询" },
    ];

    const [tempSearchType, setTempSearchType] = useState<SearchType>(searchType);
    const [tempTimeScale, setTempTimeScale] = useState<string>(timeScale);
    const [tempSingleCondition, setTempSingleCondition] = useState<IProductName | null | undefined>(singleCondition);
    const [tempMultiField, setTempMultiField] = useState<string>(multiField);
    const [tempMultiCondition, setTempMultiCondition] = useState<string>(multiCondition);

    const [products, setProducts] = useState<IProductName[]>([]);

    const allTimeScales = ['最近三个月', '最近半年', '最近一年', '最近两年', '全部数据'];
    const allFields = [SALES_VOLUME, GROSS_INCOME];

    const mapTimeScalesData = allTimeScales.map((timeScale) => ({
        value: timeScale,
        title: timeScale
    }));
    const mapMultiFieldsData = allFields.map((field) => ({
        value: field,
        title: field
    }));

    // 搜索方式change事件
    const handleSearchTypeChange = (value: SearchType) => {
        setTempSearchType(value);
        if (value === SearchType.SINGLEPRODUCT) {
            setTempTimeScale('');
            setTempSingleCondition(void 0);
        } else {
            setTempTimeScale('');
            setTempMultiField('');
            setTempMultiCondition('');
        }

    };


    // 首次加载数据
    const loadData = async () => {
        const products = await fetchProductNames();
        setProducts(products);
    };

    // 重置逻辑
    const handleReset = () => {
        setSearchType(SearchType.SINGLEPRODUCT);
        setTimeScale('');
        setSingleCondition(void 0);
        setMultiField('');
        setMultiCondition('');
        setTempSearchType(SearchType.SINGLEPRODUCT);
        setTempTimeScale('');
        setTempSingleCondition(void 0);
        setTempMultiField('');
        setTempMultiCondition('');
    };

    // 查询逻辑
    const handleSearch = () => {
        if (tempSearchType === SearchType.SINGLEPRODUCT) {
            if (!tempTimeScale || !tempSingleCondition) {
                message.error("请填写所有字段！");
                return;
            }
        }
        else {
            if (!tempTimeScale || !tempMultiField || !tempMultiCondition) {
                message.error("请填写所有字段！");
                return;
            }
        }
        setSearchType(tempSearchType);
        setTimeScale(tempTimeScale);
        setSingleCondition(tempSingleCondition);
        setMultiField(tempMultiField);
        setMultiCondition(tempMultiCondition);
    };

    useEffect(() => {
        loadData();
    }, [searchType]);



    // 查询条件change事件
    const handleTimeScaleChange = (value: string) => {
        setTempTimeScale(value)
    }

    // 单一产品查询条件逻辑
    const handleSingleConditionChange = (value: number) => {
        const product = products.find((product) => product.id === value) ??
            void 0;
        setTempSingleCondition(product);
    };

    // TopN查询依据逻辑
    const handleMultiFieldChange = (value: string) => {
        setTempMultiField(value);
    }

    // TopN查询条件逻辑
    const handleMultiConditionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTempMultiCondition(event.target.value);
    }

    const renderSearchContent = () => {
        if (tempSearchType === SearchType.SINGLEPRODUCT) {
            return (
                <>
                    <div className={styles.base}>
                        <p>产品名称：</p>
                        <Select
                            value={tempSingleCondition?.id ?? void 0}
                            showSearch
                            optionFilterProp="children"
                            onChange={handleSingleConditionChange}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={products.map(product => ({
                                value: product.id,
                                label: product.name
                            }))}
                            style={{ width: 250 }}
                        />
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className={styles.base}>
                        <p>查询依据：</p>
                        <TreeSelect
                            value={tempMultiField}
                            allowClear
                            treeDefaultExpandAll
                            treeData={mapMultiFieldsData}
                            className={styles.select}
                            onChange={handleMultiFieldChange}
                        />
                    </div>
                    <div className={styles.base}>
                        <p>查询数量：</p>
                        <Input
                            value={tempMultiCondition}
                            className={styles.select}
                            onChange={handleMultiConditionChange}
                        />
                    </div>
                </>
            );
        }
    };

    return (
        <div className={styles.search}>
            <div className={styles.left}>
                <div className={styles.base}>
                    <p>搜索方式：</p>
                    <TreeSelect
                        value={tempSearchType}
                        allowClear
                        treeDefaultExpandAll
                        treeData={searchTypes}
                        className={styles.select}
                        onChange={handleSearchTypeChange}
                    />
                </div>
                <div className={styles.base}>
                    <p>时间跨度：</p>
                    <TreeSelect
                        value={tempTimeScale}
                        allowClear
                        treeDefaultExpandAll
                        treeData={mapTimeScalesData}
                        className={styles.select}
                        onChange={handleTimeScaleChange}
                    />
                </div>
                {renderSearchContent()}
            </div>
            <div className={styles.right}>
                <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                    搜索
                </Button>
                <Button
                    type="primary"
                    danger
                    icon={<ReloadOutlined />}
                    className={styles.reset}
                    onClick={handleReset}
                >
                    重置
                </Button>
            </div>
        </div>
    );
};

export default Search;
