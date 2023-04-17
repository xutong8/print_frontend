import { Navigate, Route, Routes } from "react-router-dom";
import styles from "./App.module.less";
import NavBar from "./components/NavBar";
import { routes } from "./router/routes";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/data/product-list"/>}></Route>
        {routes.map((route) => (
          <Route key={route.title} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
