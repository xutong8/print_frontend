import { Navigate, Route, Routes } from "react-router-dom";
import styles from "./App.module.less";
import NavBar from "./components/NavBar";
import { routes } from "./router/routes";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="login" element={<LoginForm></LoginForm>}></Route>
        {routes.map((route) => (
          <Route key={route.title} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
