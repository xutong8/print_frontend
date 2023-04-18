import React from "react";
import styles from "./index.module.less";
import Header from "@/components/Header";

const ProductAdd = () => {
  return (
    <div className={styles.product_add}>
      <div className={styles.header}>
        <Header desc="新增产品项" />
      </div>
      <div className={styles.main}>
        <div className={styles.left}></div>
      </div>
    </div>
  );
};

export default ProductAdd;
