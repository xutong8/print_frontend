import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { Button, TreeSelect } from "antd";
import { IFilterCake, fetchAllFilterCakes } from "@/services/fetchFilterCakes";

const Search = () => {
  // 选中的滤饼
  const [filterCake, setFilterCake] = useState<IFilterCake | undefined>();
  // 全部的滤饼
  const [filterCakes, setFilterCakes] = useState<IFilterCake[]>([]);

  // 滤饼change事件
  const handleFilterCakeChange = (value: number) => {
    const filterCake = filterCakes.find(filterCake => filterCake.filterCakeId === value) ?? void 0;
    setFilterCake(filterCake);
  };

  // 首次加载数据
  const loadData = async () => {
    const filterCakes = await fetchAllFilterCakes();
    setFilterCakes(filterCakes);
  };

  const mapFilterCakeData = () => {
    return filterCakes.map((filterCake) => ({
      value: filterCake.filterCakeId,
      title: filterCake.filterCakeName,
    }));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.search}>
      <div className={styles.left}>
        <div className={styles.base}>
          <p>滤饼名称：</p>
          <TreeSelect
            value={filterCake?.filterCakeId}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            treeData={mapFilterCakeData()}
            onChange={handleFilterCakeChange}
            className={styles.select}
          />
        </div>
      </div>
      <div className={styles.right}>
        <Button type="primary">搜索</Button>
        <Button type="primary" danger className={styles.reset}>
          重置
        </Button>
      </div>
    </div>
  );
};

export default Search;
