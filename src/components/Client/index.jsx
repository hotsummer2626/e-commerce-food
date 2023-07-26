import styled from "styled-components";
import Searchbar from "./components/Searchbar";
import { Outlet } from "react-router-dom";
import Widget from "./components/Widget";

const Feed = styled.div`
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
                <Searchbar />
                <Outlet />
            </Feed>
            <Widget />
        </>
    );
};

export default Client;
