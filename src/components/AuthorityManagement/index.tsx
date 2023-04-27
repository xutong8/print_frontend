import React from "react";
import styles from "./index.module.less";
import Panel from "./Panel";
import authorityManagement from "@/router/authority-management";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthorityManagement = () => {
    return (
        <div className={styles.data}>
            <Panel />
            <Routes>
                <Route path="/" element={<Navigate to="/permission/member-list" />}></Route>
                {authorityManagement.map((route) => (
                    <Route key={route.title} path={route.path} element={route.element} />
                ))}
            </Routes>
        </div>
    );
};

export default AuthorityManagement;