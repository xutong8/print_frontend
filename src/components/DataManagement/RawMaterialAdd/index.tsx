import React, { useRef, useState } from "react";
import styles from "./index.module.less";
import Header from "@/components/Header";
import { Button, message } from "antd";
import RawMaterialBaseEdit, {
  RawMaterialBaseEditRef,
} from "../RawMaterialBaseEdit";
import { RawMaterialType } from "../RawMaterialEdit";
import { addRawMaterial } from "@/services/addRawMaterial";
import { IRawMaterial } from "@/services/fetchRawMaterialById";

const RawMaterialAdd = () => {
  const [rawMaterial, setRawMaterial] = useState<RawMaterialType>(null);

  const handleConfirm = async () => {
    if (rawMaterial === null) {
      message.warning("原料对象不能为空");
      return;
    }
    try {
      await addRawMaterial({
        ...(rawMaterial as IRawMaterial),
        rawMaterialHistoryPrice: baseEditRef.current?.hpRelations ?? [],
      });
      message.info("新建对象成功！");
    } catch (err) {
      message.error("新建对象失败！");
    }
  };

  const baseEditRef = useRef<RawMaterialBaseEditRef>(null);

  const handleReset = () => {
    setRawMaterial(null);
    baseEditRef.current?.setHPRelations(
      rawMaterial?.rawMaterialHistoryPrice ?? []
    );
  };

  return (
    <div className={styles.rawmaterial_add}>
      <div className={styles.header}>
        <Header desc="新增原料项" />
      </div>
      <div className={styles.main}>
        <RawMaterialBaseEdit
          rawMaterial={rawMaterial}
          setRawMaterial={setRawMaterial}
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

export default RawMaterialAdd;
