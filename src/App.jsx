import React, { useEffect } from "react";
import styled from "styled-components";
import "@/styles/global.scss";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Widget from "./components/Widget";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/slices/user";
import SnackBar from "./components/Snackbar";

const Main = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const Feed = styled.div`
    flex-grow: 1;
    background: #f5f5f5;
    height: 100%;
    overflow-y: auto;
    padding: 0 30px 40px;
`;

const App = () => {
    const { expireTime } = useSelector(({ user }) => user);
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
            <Feed>
                <Searchbar />
                <Outlet />
            </Feed>
            <Widget />
            <SnackBar />
        </Main>
    );
};

export default App;
