import styled from "styled-components";
import Auth from "./components/Auth";
import Wallet from "./components/Wallet";
import Address from "./components/Address";
import OrderMenu from "./components/OrderMenu";
import { useState } from "react";

const Container = styled.div`
    width: 350px;
    background: #fff;
    flex-shrink: 0;
    padding: 40px 30px;
`;

const Widget = () => {
    const [isLogin, setIsLogin] = useState(false);
    return (
        <Container>
            {isLogin ? <Wallet /> : <Auth />}
            <Address />
            <OrderMenu />
        </Container>
    );
};

export default Widget;
