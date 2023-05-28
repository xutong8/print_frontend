import {
    ChangeEvent,
    ForwardedRef,
    forwardRef,
    useImperativeHandle,
    useState,
} from "react";
import {
    Button,
    Input,
    Select,
    Tag,
    message,
} from "antd";
import styles from "./index.module.less";
import TextArea from "antd/es/input/TextArea";
import { PlusCircleTwoTone } from "@ant-design/icons";
import {
    ProductSeriesType,
    ProductNameType,
} from "../ProductSeryEdit";
import { IProductName } from "@/services/fetchProductNames";
import { IProductSeries, IProductSimple } from "@/services/fetchProductSeriesById";

export interface IProductSeriesBaseEditProps {
    productSeries: ProductSeriesType;
    setProductSeries: (productSeries: ProductSeriesType) => void;
    products: IProductName[];
}

export interface ProductSeriesBaseEditRef {
    pdRelations: IProductSimple[];
    setPDRelations: (pdRelations: IProductSimple[]) => void;
}

const ProductSeriesBaseEdit = (
    props: IProductSeriesBaseEditProps,
    ref: ForwardedRef<ProductSeriesBaseEditRef>
) => {
    const { productSeries, setProductSeries, products } = props;
    // 选中的产品
    const [selectedProduct, setSelectedProduct] =
        useState<ProductNameType>(null);

    // 产品关联
    const [pdRelations, setPDRelations] = useState<IProductSimple[]>(
        productSeries?.productSimpleList ?? []
    );

    // 添加产品关联
    const handlePdAdd = () => {
        if (selectedProduct === null) {
            message.warning("产品关联数据不能为空，新增失败！");
            return;
        }

        const relation = {
            productId: selectedProduct?.id ?? 0,
            productName: selectedProduct?.name ?? "",
        };
        setPDRelations([...pdRelations, relation]);
    };
    // 删除产品关联
    const handlePdDel = (relation: IProductSimple) => {
        setPDRelations(
            pdRelations.filter((pd) => pd.productId !== relation.productId)
        );
    };


    useImperativeHandle(ref, () => ({
        pdRelations,
        setPDRelations,
    }));

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                {/* 系列名称 */}
                <div className={styles.base}>
                    <p className={styles.field}>系列名称：</p>
                    <Input
                        className={styles.input}
                        value={productSeries?.productSeriesName ?? ""}
                        onChange={(event) => {
                            setProductSeries({
                                ...(productSeries ?? ({} as IProductSeries)),
                                productSeriesName: event.target.value,
                            });
                        }}
                    />
                </div>
                {/* 产品功能 */}
                <div className={styles.base}>
                    <p className={styles.field}>产品功能：</p>
                    <TextArea
                        className={styles.input}
                        placeholder="请输入产品功能信息"
                        value={productSeries?.productSeriesFunction ?? ""}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                            setProductSeries({
                                ...(productSeries ?? ({} as IProductSeries)),
                                productSeriesFunction: event.target.value,
                            });
                        }}
                    />
                </div>
            </div>
            <div className={styles.right}>
                {/* <div className={styles.rm_relations}>
                    <div className={styles.title}>
                        <div className={styles.field}>产品关联</div>
                        <Button
                            className={styles.btn}
                            type="primary"
                            ghost
                            icon={<PlusCircleTwoTone />}
                            onClick={handlePdAdd}
                        >
                            新增
                        </Button>
                    </div>
                    <div className={styles.new_relation}>
                        <div className={styles.name}>
                            <p>产品名称：</p>
                            <Select
                                value={selectedProduct?.name}
                                options={products.map((product) => ({
                                    value: product?.name ?? "",
                                    label: product?.name ?? "",
                                }))}
                                className={styles.select}
                                onChange={(productName: string) => {
                                    const product =
                                        products.find(
                                            (product) =>
                                                product.name === productName
                                        ) ?? null;
                                    setSelectedProduct(product);
                                }}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>
                    <div className={styles.exist_relations}>
                        {pdRelations.map((relation, index: number) => (
                            <Tag closable key={index} onClose={() => handlePdDel(relation)}>
                                <span>{relation.productName}</span>
                            </Tag>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default forwardRef<ProductSeriesBaseEditRef, IProductSeriesBaseEditProps>(
    ProductSeriesBaseEdit
);
