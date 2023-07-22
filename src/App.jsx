import React from "react";
import styled from "styled-components";
import "@/styles/global.scss";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Widget from "./components/Widget";
import { Outlet } from "react-router-dom";

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
    return (
        <Main>
            <Navbar />
            <Feed>
                <Searchbar />
                <Outlet />
            </Feed>
            <Widget />
        </Main>
    );
};

export default App;
