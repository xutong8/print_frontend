import styles from "./index.module.less";
import Panel from "./Panel";
import routes from "@/router/data-management";
import { Navigate, Route, Routes } from "react-router-dom";

const DataManagement = () => {
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
