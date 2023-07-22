import styled from "styled-components";
import { colors } from "@/styles/variables";

const { primaryColor, lightPrimaryColor } = colors;

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 10px;
`;

const Title = styled.h3`
    padding: 6px;
    color: ${({ isActive }) => (isActive ? primaryColor : lightPrimaryColor)};
    text-align: center;
    cursor: pointer;
`;

const UnderLine = styled.div`
    width: 100%;
    height: 3px;
    background: ${primaryColor};
    border-radius: 10px;
    transform: translateX(
        ${({ isSignInForm }) => (isSignInForm ? "0" : "100%")}
    );
    transition: 0.3s ease;
`;

const Header = ({ isSignInForm, setIsSignInForm }) => {
    return (
        <Container>
            <Title
                isActive={isSignInForm}
                onClick={() => setIsSignInForm(true)}
            >
                Sign In
            </Title>
            <Title
                isActive={!isSignInForm}
                onClick={() => setIsSignInForm(false)}
            >
                Sign Up
            </Title>
            <UnderLine isSignInForm={isSignInForm} />
        </Container>
    );
};

export default Header;
