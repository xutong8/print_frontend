import React from 'react';
import styles from './index.module.less';
import { base_icon } from '@/assets';

const ProductAdd = () => {
  return (
    <div className={styles.product_add}>
      <div className={styles.header}>
        <div className={styles.text}>
          <img src={base_icon} alt="add product desc" />
          <p className={styles.desc}>新增产品项</p>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.left}>

        </div>
      </div>
    </div>
  )
};

export default ProductAdd;