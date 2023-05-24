import { useState } from "react";
import styles from "./index.module.less";
import { IProductName } from "@/services/fetchProductNames";
import Search from "./Search";
import SearchChart from "./SearchCharts";

export enum SearchType {
  SINGLEPRODUCT = 0,
  MULTIPRODUCT = 1
}

const DataAnalysis = () => {
  const [searchType, setSearchType] = useState<SearchType>(SearchType.SINGLEPRODUCT);
  const [timeScale, setTimeScale] = useState<string>('');
  const [singleCondition, setSingleCondition] = useState<IProductName | undefined | null>(void 0);
  const [multiField, setMultiField] = useState<string>('');
  const [multiCondition, setMultiCondition] = useState<string>('');

  return (
    <div className={styles.data}>
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
