import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { Button, TreeSelect } from "antd";
import { IFilterCake, fetchAllFilterCakes } from "@/services/fetchFilterCakes";
import {
  IProductSeries,
  fetchAllProductSeries,
} from "@/services/fetchProductSeries";
import {
  IRawMaterial,
  fetchAllRawMaterials,
} from "@/services/fetchRawMaterials";
import { FilterCakeType, ProductSeriesType, RawMaterialType } from "..";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

export interface ISearchProps {
  filterCake: FilterCakeType;
  setFilterCake: (filterCake: FilterCakeType) => void;
  productSeries: ProductSeriesType;
  setProductSeries: (productSeries: ProductSeriesType) => void;
  rawMaterial: RawMaterialType;
  setRawMaterial: (rawMaterial: RawMaterialType) => void;
}

const Search: React.FC<ISearchProps> = (props) => {
  const {
    filterCake,
    setFilterCake,
    productSeries,
    rawMaterial,
    setProductSeries,
    setRawMaterial,
  } = props;

  // 全部的系列
  const [allProductSeries, setAllProductSeries] = useState<IProductSeries[]>(
    []
  );
  // 全部的滤饼
  const [filterCakes, setFilterCakes] = useState<IFilterCake[]>([]);
  // 全部的原料
  const [rawMaterials, setRawMaterials] = useState<IRawMaterial[]>([]);

  // 缓存的选中系列
  const [tempProductSeries, setTempProductSeries] =
    useState<ProductSeriesType>(productSeries);
  // 缓存的选中滤饼
  const [tempFilterCake, setTempFilterCake] =
    useState<FilterCakeType>(filterCake);
  // 缓存的选中原料
  const [tempRawMaterial, setTempRawMaterial] =
    useState<RawMaterialType>(rawMaterial);
    
  // 滤饼change事件
  const handleFilterCakeChange = (value: number) => {
    const filterCake =
      filterCakes.find((filterCake) => filterCake.filterCakeId === value) ??
      void 0;
    setTempFilterCake(filterCake);
  };

  // 产品系列change事件
  const handleProductSeriesChange = (value: number) => {
    const productSeries =
      allProductSeries.find(
        (productSeries) => productSeries.productSeriesId === value
      ) ?? void 0;
    setTempProductSeries(productSeries);
  };

  // 原料change事件
  const handleRawMaterialChange = (value: number) => {
    const rawMaterial =
      rawMaterials.find((rawMaterial) => rawMaterial.rawMaterialId === value) ??
      void 0;
    setTempRawMaterial(rawMaterial);
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
      title: rawMaterial.rawMaterialName,
    }));
  };

  const handleReset = () => {
    setFilterCake(void 0);
    setTempFilterCake(void 0);
    setProductSeries(void 0);
    setTempProductSeries(void 0);
    setRawMaterial(void 0);
    setTempRawMaterial(void 0);
  };

  const handleSearch = () => {
    setFilterCake(tempFilterCake);
    setProductSeries(tempProductSeries);
    setRawMaterial(tempRawMaterial);
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
            value={tempProductSeries?.productSeriesId}
            allowClear
            treeDefaultExpandAll
            treeData={mapProductSeriesData()}
            className={styles.select}
            onChange={handleProductSeriesChange}
          />
        </div>
        <div className={styles.base}>
          <p>滤饼名称：</p>
          <TreeSelect
            value={tempFilterCake?.filterCakeId}
            allowClear
            treeDefaultExpandAll
            treeData={mapFilterCakeData()}
            className={styles.select}
            onChange={handleFilterCakeChange}
          />
        </div>
        <div className={styles.base}>
          <p>原料名称：</p>
          <TreeSelect
            value={tempRawMaterial?.rawMaterialId}
            allowClear
            treeDefaultExpandAll
            treeData={mapRawMaterialData()}
            className={styles.select}
            onChange={handleRawMaterialChange}
          />
        </div>
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
          onReset={handleReset}
        >
          重置
        </Button>
      </div>
    </div>
  );
};

export default Search;
