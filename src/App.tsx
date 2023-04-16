import { Route, Routes } from "react-router-dom";
import styles from "./App.module.less";
import NavBar from "./components/NavBar";
import { routes } from "./router/routes";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.title} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
