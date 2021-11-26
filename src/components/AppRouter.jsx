import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/routes";

const AppRouter = () => {
    const isAuth = true;
    return isAuth ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    path={route.path}
                    element={<route.component />}
                    exact={route.exact}
                />
            ))}
            <Route path="*" element={<Navigate to="/posts" />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map((route) => (
                <Route
                    path={route.path}
                    element={<route.component />}
                    exact={route.exact}
                />
            ))}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRouter;
