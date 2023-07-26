import React, { useEffect } from "react";
import styled from "styled-components";
import "@/styles/global.scss";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/slices/user";
import SnackBar from "./components/Snackbar";

const Main = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const App = () => {
    const { expireTime } = useSelector(({ user }) => user);
    const { isShow } = useSelector(({ snackbar }) => snackbar);
    const dispatch = useDispatch();

    useEffect(() => {
        const timeout = expireTime - Date.now();
        if (timeout < 10000) {
            dispatch(logout());
            return;
        }
        const timer = setTimeout(() => {
            dispatch(logout());
        }, timeout);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Main>
            <Navbar />
            <Outlet />
            {isShow && <SnackBar />}
        </Main>
    );
};

export default App;
