import ProductList from "@/components/DataManagement/ProductList";
import {
  PRODUCT_MANAGEMENT,
  FILTERCAKE_MANAGEMENT,
  RAWMATERIAL_MANAGEMENT,
  MEMBER,
  MANAGER,
  PRODUCTSERY_MANAGEMENT,
} from "../constants/data-management";
import FilterCakeList from "@/components/DataManagement/FilterCakeList";
import RawMaterialList from "@/components/DataManagement/RawMaterialList";
import ProductAdd from "@/components/DataManagement/ProductAdd";
import FilterCakeAdd from "@/components/DataManagement/FilterCakeAdd";
import RawMaterialAdd from "@/components/DataManagement/RawMaterialAdd";
import ProductSeriesAdd from "@/components/DataManagement/ProductSeryAdd";
import ProductSeriesList from "@/components/DataManagement/ProductSeryList";

const dataManagement = [
  {
    title: "产品列表",
    path: "product-list",
    element: <ProductList />,
    parentDir: PRODUCT_MANAGEMENT,
    authority: MEMBER,
  },
  {
    title: "新增产品",
    path: "add-product",
    element: <ProductAdd />,
    parentDir: PRODUCT_MANAGEMENT,
    authority: MANAGER,
  },
  {
    title: "滤饼列表",
    path: "filtercake-list",
    element: <FilterCakeList />,
    parentDir: FILTERCAKE_MANAGEMENT,
    authority: MEMBER,
  },
  {
    title: "新增滤饼",
    path: "add-filtercake",
    element: <FilterCakeAdd />,
    parentDir: FILTERCAKE_MANAGEMENT,
    authority: MANAGER,
  },
  {
    title: "原料列表",
    path: "rawmaterial-list",
    element: <RawMaterialList />,
    parentDir: RAWMATERIAL_MANAGEMENT,
    authority: MEMBER,
  },
  {
    title: "新增原料",
    path: "add-rawmaterial",
    element: <RawMaterialAdd />,
    parentDir: RAWMATERIAL_MANAGEMENT,
    authority: MANAGER,
  },
  {
    title: "产品系列表",
    path: "productSery-list",
    element: <ProductSeriesList />,
    parentDir: PRODUCTSERY_MANAGEMENT,
    authority: MEMBER,
  },
  {
    title: "新增产品系列",
    path: "add-prodSery",
    element: <ProductSeriesAdd />,
    parentDir: PRODUCTSERY_MANAGEMENT,
    authority: MANAGER,
  },
];

export default dataManagement;
