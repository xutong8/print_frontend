import {
  PRODUCT_MANAGEMENT,
  FILTERCAKE_MANAGEMENT,
  RAWMATERIAL_MANAGEMENT,
} from "../constants/data-management";

const dataManagement = [
  {
    title: "产品列表",
    path: "product-list",
    element: <div>产品列表</div>,
    parentDir: PRODUCT_MANAGEMENT,
  },
  {
    title: "新增产品",
    path: "add-product",
    element: <div>新增产品</div>,
    parentDir: PRODUCT_MANAGEMENT,
  },
  {
    title: "滤饼列表",
    path: "filtercake-list",
    element: <div>滤饼列表</div>,
    parentDir: FILTERCAKE_MANAGEMENT,
  },
  {
    title: "新增滤饼",
    path: "add-filtercake",
    element: <div>新增滤饼</div>,
    parentDir: FILTERCAKE_MANAGEMENT,
  },
  {
    title: "原料列表",
    path: "rawmaterial-list",
    element: <div>原料列表</div>,
    parentDir: RAWMATERIAL_MANAGEMENT,
  },
  {
    title: "新增原料",
    path: "add-rawmaterial",
    element: <div>新增原料</div>,
    parentDir: RAWMATERIAL_MANAGEMENT,
  },
];

export default dataManagement;
