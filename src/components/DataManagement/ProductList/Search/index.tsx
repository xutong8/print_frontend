import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./index.module.less";
import { Button, TreeSelect } from "antd";
import {
  IFilterCakeName,
  fetchAllFilterCakes,
} from "@/services/fetchFilterCakes";
import {
  IProductSeriesName,
  fetchAllProductSeries,
} from "@/services/fetchProductSeries";
import {
  IRawMaterialName,
  fetchAllRawMaterials,
} from "@/services/fetchRawMaterials";
import {
  FilterCakeType,
  ProductSeriesType,
  RawMaterialType,
  SearchType,
} from "..";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";

export interface ISearchProps {
  filterCake: FilterCakeType;
  setFilterCake: (filterCake: FilterCakeType) => void;
  productSeries: ProductSeriesType;
  setProductSeries: (productSeries: ProductSeriesType) => void;
  rawMaterial: RawMaterialType;
  setRawMaterial: (rawMaterial: RawMaterialType) => void;
  searchType: SearchType;
  setSearchType: (searchType: SearchType) => void;
  searchField: string;
  setSearchField: (searchField: string) => void;
  searchCondition: string;
  setSearchCondition: (searchCondition: string) => void;
}

const Search: React.FC<ISearchProps> = (props) => {
  const {
    filterCake,
    setFilterCake,
    productSeries,
    rawMaterial,
    setProductSeries,
    setRawMaterial,
    searchType,
    setSearchType,
    searchField,
    setSearchField,
    searchCondition,
    setSearchCondition
  } = props;

  const searchTypes = [
    { value: SearchType.INDIRECT, title: "直接查询" },
    { value: SearchType.RELATION, title: "关联查询" },
  ];

  // 全部的系列
  const [allProductSeries, setAllProductSeries] = useState<
    IProductSeriesName[]
  >([]);
  // 全部的滤饼
  const [filterCakes, setFilterCakes] = useState<IFilterCakeName[]>([]);
  // 全部的原料
  const [rawMaterials, setRawMaterials] = useState<IRawMaterialName[]>([]);

  // 缓存的选中搜索方式
  const [tempSearchType, setTempSearchType] = useState<SearchType>(searchType);
  // 缓存的选中系列
  const [tempProductSeries, setTempProductSeries] =
    useState<ProductSeriesType>(productSeries);
  // 缓存的选中滤饼
  const [tempFilterCake, setTempFilterCake] =
    useState<FilterCakeType>(filterCake);
  // 缓存的选中原料
  const [tempRawMaterial, setTempRawMaterial] =
    useState<RawMaterialType>(rawMaterial);
  // 缓存选中的字段
  const [tempSearchField, setTempSearchField] = useState<string>(searchField);
  // 缓存填写的条件
  const [tempSearchCondition, setTempSearchCondition] = useState<string>(searchCondition);

  // 搜索方式change事件
  const handleSearchTypeChange = (value: SearchType) => {
    setTempSearchType(value);
    if (value === SearchType.INDIRECT) {
      setTempSearchField('');
      setTempSearchCondition('');
    } else {
      setTempProductSeries(void 0);
    }
  };

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
    setProductSeries(void 0);
    setSearchType(SearchType.INDIRECT);
    setTempFilterCake(void 0);
    setTempProductSeries(void 0);
    setRawMaterial(void 0);
    setTempRawMaterial(void 0);
    setTempSearchType(SearchType.INDIRECT);
    setSearchCondition('');
    setTempSearchCondition('');
    setSearchField('');
    setTempSearchField('');
  };

  // 查询逻辑
  const handleSearch = () => {
    setFilterCake(tempFilterCake);
    setProductSeries(tempProductSeries);
    setRawMaterial(tempRawMaterial);
    setSearchType(tempSearchType);
    setSearchField(tempSearchField);
    setSearchCondition(tempSearchCondition);
  };

  useEffect(() => {
    loadData();
  }, []);

  // 查询字段change事件
  const handleSearchFieldChange = (searchField: string) => {
    setTempSearchField(searchField);
  };

  // 查询条件change事件
  const handleSearchConditionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTempSearchCondition(event.target.value);
  };

  // 全部的字段
  const allFields = ['产品名称', '产品编号', '产品代码', '滤饼颜色'];

  const mapFieldsData = allFields.map(field => ({
    value: field,
    title: field
  }));

  const renderSearchContent = () => {
    if (tempSearchType === SearchType.INDIRECT) {
      return (
        <>
          <div className={styles.base}>
            <p>查询依据：</p>
            <TreeSelect
              value={tempSearchField}
              allowClear
              treeDefaultExpandAll
              treeData={mapFieldsData}
              className={styles.select}
              onChange={handleSearchFieldChange}
            />
          </div>
          <div className={styles.base}>
            <p>查询条件：</p>
            <Input
              value={tempSearchCondition}
              className={styles.select}
              onChange={handleSearchConditionChange}
            />
          </div>
        </>
      );
    } else {
      return (
        <>
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
          onReset={handleReset}
        >
          重置
        </Button>
      </div>
    </div>
  );
};

export default Search;
