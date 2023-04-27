import styles from "./index.module.less";
import { icon } from "../../assets/images";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../../router/routes";
import cn from "classnames";
import { RouteType } from "@/types";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/type";

const NavBar = () => {
  const location = useLocation();
  const selected = (route: RouteType) =>
    location.pathname.includes(route.path.split("/")[0]);
  const store = useSelector(state => state) as StoreState;

  return (
    <div className={styles.navbar}>
      <div className={styles.title}>
        <img src={icon} alt="default icon" />
        <span className={styles.desc}>印染数据可视分析系统</span>
      </div>
      <div className={styles.links}>
        {routes
          .filter((route) => store.authority >= route.authority)
          .map((route) => (
            <NavLink
              key={route.title}
              to={route.path.split("/")[0]}
              className={cn(styles.link, {
                [styles.selected]: selected(route),
              })}
            >
              {route.title}
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default NavBar;
