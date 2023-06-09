import { useSelector } from "react-redux";
import styles from "./index.module.less";
import Panel from "./Panel";
import routes from "@/router/data-management";
import { Navigate, Route, Routes } from "react-router-dom";
import { StoreState } from "@/store/type";
import { MEMBER } from "@/constants/data-management";

const DataManagement = () => {
  const user = useSelector(state => state) as StoreState;
  if (user.authority < MEMBER)
    return <></>;

  return (
    <div className={styles.data}>
      <Panel />
      <Routes>
        <Route path="/" element={<Navigate to="/data/product-list" />}></Route>
        {routes.map((route) => (
          <Route key={route.title} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default DataManagement;
