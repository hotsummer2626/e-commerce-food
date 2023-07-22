import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/styles/variables";

const { primaryColor, lightPrimaryColor } = colors;

const Container = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 20px;
    margin-bottom: 20px;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 20px;
    border-radius: 10px;
    background: ${lightPrimaryColor};
`;

const Balance = styled.div`
    padding: 15px;
    border-radius: 10px;
    background: #fff;
    & span {
        display: block;
    }
    & span:first-child {
        font-size: 12px;
    }
    & span:last-child {
        font-size: 30px;
        font-weight: bold;
        color: ${primaryColor};
    }
`;

const Topup = styled.div`
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    & span {
        font-weight: bold;
    }
`;

const IconWrapper = styled.div`
    width: 45px;
    height: 45px;
    background: #fff;
    font-size: 20px;
    color: ${primaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 15px;
    cursor: pointer;
`;

const Wallet = () => {
    return (
        <Container>
            <Title>Your Wallet Balance</Title>
            <Content>
                <Balance>
                    <span>Balance</span>
                    <span>A$1200</span>
                </Balance>
                <Topup>
                    <IconWrapper>
                        <FontAwesomeIcon icon={faMoneyBill} />
                    </IconWrapper>
                    <span>Top up</span>
                </Topup>
            </Content>
        </Container>
    );
};

export default Wallet;
