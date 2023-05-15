import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import Header from "@/components/Header";
import { Button, message } from "antd";
import ProductSeriesBaseEdit, { ProductSeriesBaseEditRef } from "../ProductSeryBaseEdit";
import { ProductSeriesType } from "../ProductSeryEdit";
import { IProductName, fetchProductNames } from "@/services/fetchProductNames";
import { IProductSeries } from "@/services/fetchProductSeriesById";
import { addProductSeries } from "@/services/addProductSeries";

const ProductSeriesAdd = () => {
    const [productSeries, setProductSeries] = useState<ProductSeriesType>(null);
    // 产品名称
    const [products, setProducts] = useState<IProductName[]>([]);

    const fetchInitialData = async () => {
        const products = await fetchProductNames();
        console.log("product names: ", products);
        setProducts(products);
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const handleConfirm = async () => {
        if (productSeries === null) {
            message.warning("产品系列对象不能为空");
            return;
        }
        try {
            console.log("addProductSeries: ", {
                ...{ productSeriesId: 0 },
                ...(productSeries as IProductSeries),
                productSimpleList: baseEditRef.current?.pdRelations ?? [],
            })
            await addProductSeries({
                ...(productSeries as IProductSeries),
                productSimpleList: baseEditRef.current?.pdRelations ?? [],
            });
            message.info("新建对象成功！");
        } catch (err) {
            message.error("新建对象失败！");
        }
    };

    const baseEditRef = useRef<ProductSeriesBaseEditRef>(null);

    //这里可能有问题
    const handleReset = () => {
        setProductSeries(null);
        baseEditRef.current?.setPDRelations(
            productSeries?.productSimpleList ?? []
        );
    };

    return (
        <div className={styles.filtercake_add}>
            <div className={styles.header}>
                <Header desc="新增产品系列项" />
            </div>
            <div className={styles.main}>
                <ProductSeriesBaseEdit
                    productSeries={productSeries}
                    setProductSeries={setProductSeries}
                    products={products}
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

export default ProductSeriesAdd;
