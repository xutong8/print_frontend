import dataManagement from "./data-management";
import DataManagement from "@/components/DataManagement";
import authorityManagement from "./authority-management";
import AuthorityManagement from "@/components/AuthorityManagement";
import { MEMBER, OWNER } from "@/constants/data-management";

export const routes = [
  {
    title: "数据管理",
    path: "data/*",
    element: <DataManagement />,
    children: dataManagement,
    authority: MEMBER,
  },
  {
    title: "权限管理",
    path: "permission/*",
    element: <AuthorityManagement></AuthorityManagement>,
    children: authorityManagement,
    authority: OWNER,
  },
];
