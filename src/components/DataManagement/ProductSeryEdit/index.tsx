import { Modal, message } from "antd";
import React, { forwardRef, useRef, useState } from "react";
import { useImperativeHandle, ForwardedRef } from "react";
import { IProductName } from "@/services/fetchProductNames";
import { IProductSeries } from "@/services/fetchProductSeriesById";
import ProductSerieBaseEdit, { ProductSeriesBaseEditRef } from "../ProductSeryBaseEdit";
import { updateProductSeries } from "@/services/updateProductSeries";

export interface IProductSeriesEditProps {
    setForceUpdate: (forceUpdate: {}) => void;
}

export interface ProductSeriesEditRef {
    setShowModal: (showModal: boolean) => void;
    setProductSeries: (productSeres: ProductSeriesType) => void;
    setProducts: (products: IProductName[]) => void;
}

export type ProductSeriesType = IProductSeries | null;
export type ProductNameType = IProductName | null;

const ProductSeriesEdit = (
    props: IProductSeriesEditProps,
    ref: ForwardedRef<ProductSeriesEditRef>
) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    // 产品系列信息
    const [productSeries, setProductSeries] = useState<ProductSeriesType>(null);
    // 产品名称
    const [products, setProducts] = useState<IProductName[]>([]);

    const baseEditRef = useRef<ProductSeriesBaseEditRef>(null);
    // 点击确认
    const handleOk = async () => {
        setShowModal(false);
        if (productSeries === null) {
            message.warning("产品系列对象不能为空");
            return;
        }
        try {
            await updateProductSeries({
                ...(productSeries as IProductSeries),
                productSimpleList: baseEditRef.current?.pdRelations ?? [],
            });
            message.success("新建对象成功！");
            props.setForceUpdate({});
        } catch (err) {
            message.error("新建对象失败！");
        }
    };

    // 点击取消
    const handleCancel = () => {
        setShowModal(false);
    };

    useImperativeHandle(ref, () => ({
        setShowModal,
        setProductSeries,
        setProducts,
    }));

    return (
        <Modal
            title="产品系列编辑"
            open={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认"
            cancelText="取消"
            width={1000}
            destroyOnClose={true}
        >
            <ProductSerieBaseEdit
                productSeries={productSeries}
                setProductSeries={setProductSeries}
                products={products}
                ref={baseEditRef}
            />
        </Modal>
    );
};

export default forwardRef<ProductSeriesEditRef, IProductSeriesEditProps>(
    ProductSeriesEdit
);
