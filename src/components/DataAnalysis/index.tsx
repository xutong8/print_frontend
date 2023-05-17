import React from "react";
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

const DataAnalysis = () => {
  const user = useSelector(state => state) as StoreState;

  if (user.authority < MEMBER)
    return <></>;
  return (
    <div className={styles.data}>
      {/* <ProductList></ProductList> */}
      <div className={styles.search}></div>
      <div className={styles.table}>
        <LineRace></LineRace>
        <StackedAreaChart></StackedAreaChart>
        <BasicLineChart datax={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} dataSeries={[150, 230, 224, 218, 135, 147, 260]}></BasicLineChart>
        <BasicBar></BasicBar>
      </div>
    </div>
  );
};

export default DataAnalysis;
