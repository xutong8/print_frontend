import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { Button, TreeSelect } from "antd";
import { IFilterCake, fetchAllFilterCakes } from "@/services/fetchFilterCakes";
import {
  IProductSeries,
  fetchAllProductSeries,
} from "@/services/fetchProductSeries";
import { IRawMaterial, fetchAllRawMaterials } from "@/services/fetchRawMaterials";

const Search = () => {
  // 选中的系列
  const [productSeries, setProductSeries] = useState<
    IProductSeries | undefined
  >();
  // 全部的系列
  const [allProductSeries, setAllProductSeries] = useState<IProductSeries[]>(
    []
  );

  // 选中的滤饼
  const [filterCake, setFilterCake] = useState<IFilterCake | undefined>();
  // 全部的滤饼
  const [filterCakes, setFilterCakes] = useState<IFilterCake[]>([]);

  // 选中的原料
  const [rawMaterial, setRawMaterial] = useState<IRawMaterial | undefined>();
  // 全部的原料
  const [rawMaterials, setRawMaterials] = useState<IRawMaterial[]>([]);

  // 滤饼change事件
  const handleFilterCakeChange = (value: number) => {
    const filterCake =
      filterCakes.find((filterCake) => filterCake.filterCakeId === value) ??
      void 0;
    setFilterCake(filterCake);
  };

  // 滤饼change事件
  const handleProductSeriesChange = (value: number) => {
    const productSeries =
      allProductSeries.find(
        (productSeries) => productSeries.productSeriesId === value
      ) ?? void 0;
    setProductSeries(productSeries);
  };

  // 原料change事件
  const handleRawMaterialChange = (value: number) => {
    const rawMaterial =
      rawMaterials.find((rawMaterial) => rawMaterial.rawMaterialId === value) ??
      void 0;
    setRawMaterial(rawMaterial);
  };

  // 首次加载数据
  const loadData = async () => {
    const filterCakes = await fetchAllFilterCakes();
    setFilterCakes(filterCakes);
    const allProductSeries = await fetchAllProductSeries();
    setAllProductSeries(allProductSeries);
    const rawMaterials = await fetchAllRawMaterials();
    setRawMaterials(rawMaterials);
  };

  const mapFilterCakeData = () => {
    return filterCakes.map((filterCake) => ({
      value: filterCake.filterCakeId,
      title: filterCake.filterCakeName,
    }));
  };

  const mapProductSeriesData = () => {
    return allProductSeries.map((productSeries) => ({
      value: productSeries.productSeriesId,
      title: productSeries.productSeriesName,
    }));
  };

  const mapRawMaterialData = () => {
    return rawMaterials.map((rawMaterial) => ({
      value: rawMaterial.rawMaterialId,
      title: rawMaterial.rawMaterialName
    }));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.search}>
      <div className={styles.left}>
        <div className={styles.base}>
          <p>系列名称：</p>
          <TreeSelect
            value={productSeries?.productSeriesId}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            treeData={mapProductSeriesData()}
            onChange={handleProductSeriesChange}
            className={styles.select}
          />
        </div>
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
        <div className={styles.base}>
          <p>原料名称：</p>
          <TreeSelect
            value={rawMaterial?.rawMaterialId}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            treeData={mapRawMaterialData()}
            onChange={handleRawMaterialChange}
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
