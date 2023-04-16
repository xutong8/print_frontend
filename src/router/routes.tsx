import dataManagement from "./data-management";
import DataManagement from "@/components/DataManagement";

export const routes = [
  {
    title: "数据管理",
    path: "data/*",
    element: <DataManagement />,
    children: dataManagement,
  },
  {
    title: "权限管理",
    path: "permission/*",
    element: <div>权限管理</div>,
  },
];
