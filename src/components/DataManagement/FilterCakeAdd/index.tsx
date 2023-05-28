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
import FilterCakeEdit, { FilterCakeEditRef } from "../FilterCakeEdit";
import FilterCakeBaseEdit from "../FilterCakeBaseEdit";
import { FilterCakeType } from "../FilterCakeEdit";
import { FilterCakeBaseEditRef } from "../FilterCakeBaseEdit";
import { addFilterCake } from "@/services/addFilterCake";
import { IFilterCake } from "@/services/fetchFilterCakeById";

const FilterCakeAdd = () => {
  const [filterCake, setFilterCake] = useState<FilterCakeType>(null);
  // 原料名称
  const [rawMaterials, setRawMaterials] = useState<IRawMaterialName[]>([]);
  // 滤饼名称
  const [filterCakes, setFilterCakes] = useState<IFilterCakeName[]>([]);

  const fetchInitialData = async () => {
    const [rawMaterials, filterCakes] = await Promise.all([
      fetchAllRawMaterials(),
      fetchAllFilterCakes(),
    ]);
    setRawMaterials(rawMaterials);
    setFilterCakes(filterCakes);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleConfirm = async () => {
    if (filterCake === null) {
      message.warning("滤饼对象不能为空");
      return;
    }
    try {
      await addFilterCake({
        ...{ filterCakePriceIncreasePercent: 0, filterCakeUnitPrice: 0, filterCakeId: 0 },
        ...(filterCake as IFilterCake),
        rawMaterialSimpleList: baseEditRef.current?.rmRelations ?? [],
        filterCakeSimpleList: baseEditRef.current?.fcRelations ?? [],
      });
      message.success("新建对象成功！");
    } catch (err) {
      message.error(err as string + ", 新建对象失败！");
    }
  };

  const baseEditRef = useRef<FilterCakeBaseEditRef>(null);

  const handleReset = () => {
    setFilterCake(null);
    baseEditRef.current?.setRMRelations(
      filterCake?.rawMaterialSimpleList ?? []
    );
    baseEditRef.current?.setFCRelations(filterCake?.filterCakeSimpleList ?? []);
  };

  return (
    <div className={styles.filtercake_add}>
      <div className={styles.header}>
        <Header desc="新增滤饼项" />
      </div>
      <div className={styles.main}>
        <FilterCakeBaseEdit
          filterCake={filterCake}
          setFilterCake={setFilterCake}
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

export default FilterCakeAdd;
