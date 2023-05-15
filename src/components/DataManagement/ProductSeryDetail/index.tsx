import React, {
    ForwardedRef,
    forwardRef,
    useImperativeHandle,
    useState,
} from "react";
import { Modal } from "antd";
import { ProductSeriesType } from "../ProductSeryEdit";
import ProductSeriesBaseDetail from "../ProductSeryBaseDetail";

export interface IProductSeriesDetailProps { }

export interface ProductSeriesDetailRef {
    setShowModal: (showModal: boolean) => void;
    setProductSeries: (product: ProductSeriesType) => void;
}

const ProductSeryDetail = (
    props: IProductSeriesDetailProps,
    ref: ForwardedRef<ProductSeriesDetailRef>
) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [productSeries, setProductSeries] = useState<ProductSeriesType>(null);

    // 点击确认
    const handleOk = () => {
        setShowModal(false);
    };

    // 点击取消
    const handleCancel = () => {
        setShowModal(false);
    };

    useImperativeHandle(ref, () => ({
        setShowModal,
        setProductSeries,
    }));

    return (
        <Modal
            title="产品系列详情"
            open={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认"
            cancelText="取消"
            width={1000}
            destroyOnClose={true}
        >
            <ProductSeriesBaseDetail productSeries={productSeries} />
        </Modal>
    );
};

export default forwardRef<ProductSeriesDetailRef, IProductSeriesDetailProps>(
    ProductSeryDetail
);
