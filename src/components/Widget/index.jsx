import styled from "styled-components";
import Wallet from "./components/Wallet";
import Address from "./components/Address";
import OrderMenu from "./components/OrderMenu";

const Container = styled.div`
    width: 350px;
    background: #fff;
    flex-shrink: 0;
    padding: 40px 30px;
`;

const Widget = () => {
    return (
        <Container>
            <Wallet />
            <Address />
            <OrderMenu />
        </Container>
    );
};

export default Widget;
