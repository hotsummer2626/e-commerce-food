import styled from "styled-components";
import { colors } from "@/styles/variables";
import { useEffect, useState } from "react";

const { successColor, errorColor } = colors;

const Container = styled.div`
    position: absolute;
    z-index: 999;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    border-radius: 10px;
    background: ${successColor};
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding: 15px;
    opacity: ${({ isShow }) => (isShow ? "1" : "0")};
`;

const SnackBar = () => {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setIsShow(true);
    }, []);

    return <Container isShow={isShow}>asdfasfd</Container>;
};

export default SnackBar;
