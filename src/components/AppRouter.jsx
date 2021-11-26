import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/routes";
import { useContext } from "react";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);
    console.log(isAuth);
    if (isLoading) {
        return <Loader />;
    }
    return isAuth ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    path={route.path}
                    element={<route.component />}
                    exact={route.exact}
                    key={route.path}
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
                    key={route.path}
                />
            ))}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRouter;
