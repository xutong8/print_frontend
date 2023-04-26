import styles from "./index.module.less";
import {
  PRODUCT_MANAGEMENT,
  FILTERCAKE_MANAGEMENT,
  RAWMATERIAL_MANAGEMENT,
} from "@/constants/data-management";
import routes from "@/router/data-management";
import { manage, submanage, submanage_selected } from "@/assets";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import { RouteType } from "@/types";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/type";

const directorys = [
  {
    title: "产品管理",
    abbr: PRODUCT_MANAGEMENT,
  },
  {
    title: "滤饼管理",
    abbr: FILTERCAKE_MANAGEMENT,
  },
  {
    title: "原料管理",
    abbr: RAWMATERIAL_MANAGEMENT,
  },
];

const Panel = () => {
  const location = useLocation();
  const selected = (route: RouteType) => location.pathname.includes(route.path);
  const user = useSelector(state => state) as StoreState;

  return (
    <div className={styles.panel}>
      {directorys.map((directory) => (
        <div className={styles.directory} key={directory.abbr}>
          <div className={styles.title}>
            <img src={manage} alt="manage icon" />
            <p className={styles.manageDesc}>{directory.title}</p>
          </div>
          {routes
            .filter((route) => route.parentDir === directory.abbr && user.authority <= route.authority)
            .map((route) => (
              <NavLink
                key={route.title}
                to={route.path}
                className={styles.link}
              >
                <img
                  src={selected(route) ? submanage_selected : submanage}
                  alt="submanage icon"
                />
                <p
                  className={cn(styles.submanageDesc, {
                    [styles.selected]: selected(route),
                    [styles.normal]: !selected(route),
                  })}
                >
                  {route.title}
                </p>
              </NavLink>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Panel;
