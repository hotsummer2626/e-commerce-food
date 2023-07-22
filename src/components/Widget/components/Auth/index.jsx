import styled from "styled-components";
import { useState } from "react";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";

const Container = styled.div`
    width: 100%;
`;

const Auth = () => {
    const [isSignInForm, setIsSignInForm] = useState(false);
    return (
        <Container>
            <Header
                isSignInForm={isSignInForm}
                setIsSignInForm={setIsSignInForm}
            />
            {isSignInForm ? <Login /> : <Register setIsSignInForm={setIsSignInForm}/>}
        </Container>
    );
};

export default Auth;
