import React, { useState } from "react";
import styles from "./index.module.less";
import Search from "./Search";
import { IFilterCakeName } from "@/services/fetchFilterCakes";
import { IProductSeriesName } from "@/services/fetchProductSeries";
import { IRawMaterialName } from "@/services/fetchRawMaterials";
import Table from "./Table";

export type FilterCakeType = IFilterCakeName | undefined;
export type ProductSeriesType = IProductSeriesName | undefined;
export type RawMaterialType = IRawMaterialName | undefined;

export enum SearchType {
  INDIRECT = 0,
  RELATION = 1
};

const ProductList = () => {
  // 搜索方式
  const [searchType, setSearchType] = useState<SearchType>(SearchType.INDIRECT);
  // 选中的滤饼
  const [filterCake, setFilterCake] = useState<FilterCakeType>();
  // 选中的系列
  const [productSeries, setProductSeries] = useState<ProductSeriesType>();
  // 选中的原料
  const [rawMaterial, setRawMaterial] = useState<RawMaterialType>();

  return (
    <div className={styles.product_list}>
      <Search
        filterCake={filterCake}
        setFilterCake={setFilterCake}
        productSeries={productSeries}
        setProductSeries={setProductSeries}
        rawMaterial={rawMaterial}
        setRawMaterial={setRawMaterial}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      <Table
        filterCake={filterCake}
        productSeries={productSeries}
        rawMaterial={rawMaterial}
        searchType={searchType}
      />
    </div>
  );
};

export default ProductList;
