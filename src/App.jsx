import React from "react";
import styled from "styled-components";
import "@/styles/global.scss";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import SnackBar from "./components/Snackbar";
import useUser from "./hooks/useUser";

const Main = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const App = () => {
    useUser();
    const { isShow } = useSelector(({ snackbar }) => snackbar);

    return (
        <Main>
            <Navbar />
            <Outlet />
            {isShow && <SnackBar />}
        </Main>
    );
};

export default App;
