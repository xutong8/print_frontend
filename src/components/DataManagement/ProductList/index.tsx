import React from 'react';
import styles from './index.module.less';
import Search from './Search';

const ProductList = () => {
  return (
    <div className={styles.product_list}>
      <Search />
    </div>
  )
};

export default ProductList;