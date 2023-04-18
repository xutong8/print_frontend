import ProductList from "@/components/DataManagement/ProductList";
import {
  PRODUCT_MANAGEMENT,
  FILTERCAKE_MANAGEMENT,
  RAWMATERIAL_MANAGEMENT,
} from "../constants/data-management";
import FilterCakeList from "@/components/DataManagement/FilterCakeList";
import RawMaterialList from "@/components/DataManagement/RawMaterialList";
import ProductAdd from "@/components/DataManagement/ProductAdd";

const dataManagement = [
  {
    title: "产品列表",
    path: "product-list",
    element: <ProductList />,
    parentDir: PRODUCT_MANAGEMENT,
  },
  {
    title: "新增产品",
    path: "add-product",
    element: <ProductAdd />,
    parentDir: PRODUCT_MANAGEMENT,
  },
  {
    title: "滤饼列表",
    path: "filtercake-list",
    element: <FilterCakeList />,
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
    element: <RawMaterialList />,
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
