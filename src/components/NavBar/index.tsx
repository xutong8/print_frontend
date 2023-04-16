import styles from "./index.module.less";
import { icon } from "../../assets/images";
import { NavLink } from "react-router-dom";
import { routes } from "../../router/routes";

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.title}>
        <img src={icon} alt="default icon" />
        <span className={styles.desc}>印染数据可视分析系统</span>
      </div>
      <div className={styles.links}>
        {routes.map((route) => (
          <NavLink key={route.title} to={route.path} className={styles.link}>
            {route.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
