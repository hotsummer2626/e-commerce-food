import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/styles/variables";
import button from "@/styles/button";

const { primaryColor, greyColor } = colors;

const Container = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;

const Title = styled.h3`
    font-size: 18px;
    color: ${greyColor};
`;

const Location = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    & span {
        font-size: 15px;
    }
`;

const Icon = styled.div`
    color: ${primaryColor};
    padding-top: 2px;
`;

const Button = styled.div`
    ${button('outlined')};
    width: 100px;
    padding: 3px;
`;

const Address = () => {
    return (
        <Container>
            <Header>
                <Title>Your Address</Title>
                <Button>Change</Button>
            </Header>
            <Location>
                <Icon>
                    <FontAwesomeIcon icon={faLocationDot} />
                </Icon>
                <span>address address address address address address</span>
            </Location>
        </Container>
    );
};

export default Address;
