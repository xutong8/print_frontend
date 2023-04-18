import React from 'react';
import styles from './index.module.less';
import { base_icon } from '@/assets';

export interface IHeaderProps {
  desc: string;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const { desc } = props;
  return (
    <div className={styles.header}>
      <img src={base_icon} alt="base icon desc" />
          <p className={styles.desc}>{desc}</p>
    </div>
  )
};

export default Header;