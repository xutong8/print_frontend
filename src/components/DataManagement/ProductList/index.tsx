import React, { useState } from "react";
import styles from "./index.module.less";
import Search from "./Search";
import { IFilterCake } from "@/services/fetchFilterCakes";
import { IProductSeries } from "@/services/fetchProductSeries";
import { IRawMaterial } from "@/services/fetchRawMaterials";
import Table from "./Table";

export type FilterCakeType = IFilterCake | undefined;
export type ProductSeriesType = IProductSeries | undefined;
export type RawMaterialType = IRawMaterial | undefined;

const ProductList = () => {
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
      />
      <Table
        filterCake={filterCake}
        productSeries={productSeries}
        rawMaterial={rawMaterial}
      />
    </div>
  );
};

export default ProductList;
