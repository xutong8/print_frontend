import React, { useState } from "react";
import Search from "./Search";
import styles from "./index.module.less";
import Table from './Table';

const ProductSeriesList = () => {
  // 查询依据
  const [searchField, setSearchField] = useState<string>("");
  // 查询条件
  const [searchCondition, setSearchCondition] = useState<string>("");

  return (
    <div className={styles.filtercake_list}>
      <Search
        searchField={searchField}
        setSearchField={setSearchField}
        searchCondition={searchCondition}
        setSearchCondition={setSearchCondition}
      />
      <Table
        searchField={searchField}
        searchCondition={searchCondition}
      />
    </div>
  );
};

export default ProductSeriesList;
