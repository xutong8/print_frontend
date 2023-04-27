import { RouteType } from "@/types";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./index.module.less"
import { StoreState } from "@/store/type";
import { manage, submanage, submanage_selected } from "@/assets/images";
import cn from "classnames";
import authorityManagement from "@/router/authority-management";

const directorys = [
    {
        title: "成员管理",
        abbr: "INFORMATION_MANAGEMENT"
    }
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
                    {authorityManagement
                        .filter((route) => user.authority <= route.authority)
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