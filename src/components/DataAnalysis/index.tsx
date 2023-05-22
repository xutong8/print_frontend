import React, { useState } from "react";
import styles from "./index.module.less";
import routes from "@/router/data-management";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/type";
import { MEMBER } from "@/constants/data-management";
import StackedAreaChart from "../Echarts/StackedAreaChart";
import LineRace from "../Echarts/LineRace";
import BasicLineChart from "../Echarts/BasicLineChart";
import BasicBar from "../Echarts/BasicBar";
import { IProductName } from "@/services/fetchProductNames";
import Search from "./Search";
import SearchChart from "./SearchCharts";

export enum SearchType {
  SINGLEPRODUCT = 0,
  MULTIPRODUCT = 1
}

const DataAnalysis = () => {
  const user = useSelector(state => state) as StoreState;

  const [searchType, setSearchType] = useState<SearchType>(SearchType.SINGLEPRODUCT);
  const [timeScale, setTimeScale] = useState<string>('');
  const [singleCondition, setSingleCondition] = useState<IProductName | undefined | null>(void 0);
  const [multiField, setMultiField] = useState<string>('');
  const [multiCondition, setMultiCondition] = useState<string>('');

  if (user.authority < MEMBER)
    return <></>;
  return (
    <div className={styles.data}>
      {/* <ProductList></ProductList> */}
      {/* <div className={styles.search}></div> */}
      <Search
        searchType={searchType}
        setSearchType={setSearchType}
        timeScale={timeScale}
        setTimeScale={setTimeScale}
        singleCondition={singleCondition}
        setSingleCondition={setSingleCondition}
        multiField={multiField}
        setMultiField={setMultiField}
        multiCondition={multiCondition}
        setMultiCondition={setMultiCondition}
      ></Search>
      <SearchChart
        searchType={searchType}
        timeScale={timeScale}
        singleCondition={singleCondition}
        multiField={multiField}
        multiCondition={multiCondition}
      ></SearchChart>
    </div>
  );
};

export default DataAnalysis;
