import styled from "styled-components";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Widget from "./components/Widget";
import scrollbar from "@/styles/scrollbar";

const Feed = styled.div`
    ${scrollbar()};
    flex-grow: 1;
    background: #f5f5f5;
    height: 100%;
    overflow-y: auto;
    padding: 0 30px 40px;
`;

const Client = () => {
    return (
        <>
            <Feed>
                <Header />
                <Outlet />
            </Feed>
            <Widget />
        </>
    );
};

export default Client;
