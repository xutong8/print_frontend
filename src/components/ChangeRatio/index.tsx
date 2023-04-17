import React from "react";
import styles from "./index.module.less";
import { down_icon, up_icon } from "@/assets";

export interface IChangeRatioProps {
  value: number;
}

const ChangeRatio: React.FC<IChangeRatioProps> = (props) => {
  const { value } = props;

  const renderElement = (value: number) => {
    if (value > 0) {
      return (
        <>
          <p className={styles.red}>{value + "%"}</p>
          <img src={up_icon} alt="up icon" />
        </>
      );
    } else if (value < 0) {
      return (
        <>
          <p className={styles.green}>{value + "%"}</p>
          <img src={down_icon} alt="down icon" />
        </>
      );
    } else {
      return (
        <>
          <p className={styles.gray}>{value + "%"}</p>
        </>
      );
    }
  };

  return <div className={styles.change_ratio}>{renderElement(value)}</div>;
};

export default ChangeRatio;
