import { Navigate, Route, Routes } from "react-router-dom";
import styles from "./App.module.less";
import NavBar from "./components/NavBar";
import { routes } from "./router/routes";
import Login from "./components/LoginForm";
import Register from "./components/Register";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        {routes.map((route) => (
          <Route key={route.title} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
