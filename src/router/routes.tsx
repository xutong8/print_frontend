import dataManagement from "./data-management";
import DataManagement from "@/components/DataManagement";
import LoginForm from "@/components/LoginForm";
import authorityManagement from "./authority-management";
import AuthorityManagement from "@/components/AuthorityManagement";

export const routes = [
  {
    title: "数据管理",
    path: "data/*",
    element: <DataManagement />,
    children: dataManagement,
    authority: 2,
  },
  {
    title: "权限管理",
    path: "permission/*",
    element: <AuthorityManagement></AuthorityManagement>,
    children: authorityManagement,
    authority: 0,
  },
];
