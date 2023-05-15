import React, { ChangeEvent, useState } from "react";
import styles from "./index.module.less";
import { Button, Input, TreeSelect } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

export interface ISearchProps {
  searchField: string;
  setSearchField: (searchField: string) => void;
  searchCondition: string;
  setSearchCondition: (searchCondition: string) => void;
}

const Search: React.FC<ISearchProps> = (props) => {
  const {
    searchField,
    setSearchField,
    searchCondition,
    setSearchCondition
  } = props;

  // 全部的字段
  const allFields = ['系列名称', '系列功能'];

  // 缓存选中的查询字段
  const [tempSearchField, setTempSearchField] = useState<string>(searchField);
  // 缓存填写的查询条件
  const [tempSearchCondition, setTempSearchCondition] = useState<string>(searchCondition);

  // 查询字段change事件
  const handleSearchFieldChange = (searchField: string) => {
    setTempSearchField(searchField);
  };

  // 查询条件change事件
  const handleSearchConditionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTempSearchCondition(event.target.value);
  };

  // 重置逻辑
  const handleReset = () => {
    setSearchCondition('');
    setTempSearchCondition('');
    setSearchField('');
    setTempSearchField('');
  };

  // 查询逻辑
  const handleSearch = () => {
    setSearchField(tempSearchField);
    setSearchCondition(tempSearchCondition);
  };

  const mapFieldsData = allFields.map(field => ({
    value: field,
    title: field
  }));

  return (
    <div className={styles.search}>
      <div className={styles.left}>
        <div className={styles.base}>
          <p>查询依据：</p>
          <TreeSelect
            value={tempSearchField}
            allowClear
            treeDefaultExpandAll
            treeData={mapFieldsData}
            className={styles.select}
            onChange={handleSearchFieldChange}
          />
        </div>
        <div className={styles.base}>
          <p>查询条件：</p>
          <Input
            value={tempSearchCondition}
            className={styles.select}
            onChange={handleSearchConditionChange}
          />
        </div>
      </div>
      <div className={styles.right}>
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          搜索
        </Button>
        <Button
          type="primary"
          danger
          icon={<ReloadOutlined />}
          className={styles.reset}
          onClick={handleReset}
        >
          重置
        </Button>
      </div>
    </div>
  );
};

export default Search;
