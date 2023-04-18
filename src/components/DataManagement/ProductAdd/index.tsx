import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import Header from "@/components/Header";
import ProductBaseEdit from "../ProductBaseEdit";
import { ProductType } from "../ProductEdit";
import {
  IProductSeries,
  fetchAllProductSeries,
} from "@/services/fetchProductSeries";
import {
  IRawMaterial,
  fetchAllRawMaterials,
} from "@/services/fetchRawMaterials";
import { IFilterCake, fetchAllFilterCakes } from "@/services/fetchFilterCakes";
import { Button } from "antd";

const ProductAdd = () => {
  const [product, setProduct] = useState<ProductType>(null);
  // 产品系列
  const [series, setSeries] = useState<IProductSeries[]>([]);
  // 原料名称
  const [rawMaterials, setRawMaterials] = useState<IRawMaterial[]>([]);
  // 滤饼名称
  const [filterCakes, setFilterCakes] = useState<IFilterCake[]>([]);

  const fetchInitialData = async () => {
    const [series, rawMaterials, filterCakes] = await Promise.all([
      fetchAllProductSeries(),
      fetchAllRawMaterials(),
      fetchAllFilterCakes(),
    ]);
    setSeries(series);
    setRawMaterials(rawMaterials);
    setFilterCakes(filterCakes);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className={styles.product_add}>
      <div className={styles.header}>
        <Header desc="新增产品项" />
      </div>
      <div className={styles.main}>
        <ProductBaseEdit
          product={product}
          setProduct={setProduct}
          series={series}
          rawMaterials={rawMaterials}
          filterCakes={filterCakes}
        />
      </div>
      <div className={styles.footer}>
        <Button type="primary">确认</Button>
        <Button type="primary" danger className={styles.reset}>
          重置
        </Button>
      </div>
    </div>
  );
};

export default ProductAdd;
