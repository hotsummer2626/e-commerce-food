import styled from "styled-components";
import useSignInRequired from "@/hooks/useSignInRequired";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Container = styled.div`
    flex-grow: 1;
    background: #f5f5f5;
    height: 100%;
    overflow-y: auto;
    padding: 0 30px 40px;
    display: flex;
    flex-direction: column;
`;

const Admin = () => {
    const { currentUser } = useSignInRequired();
    return currentUser ? (
        <Container>
            <Header />
            <Outlet />
        </Container>
    ) : null;
};

export default Admin;
