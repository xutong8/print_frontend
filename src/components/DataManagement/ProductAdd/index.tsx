import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import Header from "@/components/Header";
import ProductBaseEdit, { ProductBaseEditRef } from "../ProductBaseEdit";
import { ProductType } from "../ProductEdit";
import {
  IProductSeriesName,
  fetchAllProductSeries,
} from "@/services/fetchProductSeries";
import {
  IRawMaterialName,
  fetchAllRawMaterials,
} from "@/services/fetchRawMaterials";
import {
  IFilterCakeName,
  fetchAllFilterCakes,
} from "@/services/fetchFilterCakes";
import { Button, message } from "antd";
import { addProduct } from "@/services/addProduct";
import { IProduct } from "@/services/fetchProductById";
import { checkPermission } from "@/utils";
import { MANAGER } from "@/constants/data-management";

const ProductAdd = () => {
  const [product, setProduct] = useState<ProductType>(null);
  // 产品系列
  const [series, setSeries] = useState<IProductSeriesName[]>([]);
  // 原料名称
  const [rawMaterials, setRawMaterials] = useState<IRawMaterialName[]>([]);
  // 滤饼名称
  const [filterCakes, setFilterCakes] = useState<IFilterCakeName[]>([]);

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

  const handleConfirm = async () => {
    //判断用户权限
    if (!checkPermission(MANAGER))
      return;
    if (product === null) {
      message.warning("产品对象不能为空");
      return;
    }
    try {
      await addProduct({
        ...{ productPriceIncreasePercent: 0, productUnitPrice: 0, productId: 0 },
        ...(product as IProduct),
        rawMaterialSimpleList: baseEditRef.current?.rmRelations ?? [],
        filterCakeSimpleList: baseEditRef.current?.fcRelations ?? [],
      });
      message.success("新建对象成功！");
    } catch (err) {
      message.error(err as string + ", 新建对象失败！");
    }
  };

  const baseEditRef = useRef<ProductBaseEditRef>(null);

  const handleReset = () => {
    setProduct(null);
    baseEditRef.current?.setRMRelations(product?.rawMaterialSimpleList ?? []);
    baseEditRef.current?.setFCRelations(product?.filterCakeSimpleList ?? []);
  };

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
          ref={baseEditRef}
        />
      </div>
      <div className={styles.footer}>
        <Button type="primary" onClick={handleConfirm}>
          确认
        </Button>
        <Button
          type="primary"
          danger
          className={styles.reset}
          onClick={handleReset}
        >
          重置
        </Button>
      </div>
    </div>
  );
};

export default ProductAdd;
