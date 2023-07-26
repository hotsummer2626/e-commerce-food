import styled from "styled-components";
import Auth from "./components/Auth";
import Wallet from "./components/Wallet";
import Address from "./components/Address";
import OrderMenu from "./components/OrderMenu";
import { useSelector } from "react-redux";

const Container = styled.div`
    width: 350px;
    background: #fff;
    flex-shrink: 0;
    padding: 40px 30px;
    @media (max-width: 576px) {
        display: none;
    }
`;

const Widget = () => {
    const { currentUser } = useSelector(({ user }) => user);

    return (
        <Container>
            {currentUser ? (
                <>
                    <Wallet />
                    <Address />
                    <OrderMenu />
                </>
            ) : (
                <Auth />
            )}
        </Container>
    );
};

export default Widget;
