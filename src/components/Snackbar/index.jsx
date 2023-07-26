import styled, { css } from "styled-components";
import { colors } from "@/styles/variables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbarConfig } from "@/store/slices/snackbar";

const { successColor, errorColor } = colors;

const Container = styled.div`
    position: absolute;
    z-index: 999;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    border-radius: 10px;
    background: ${({ type }) => {
        switch (type) {
            case "success":
                return successColor;
            case "error":
                return errorColor;
            default:
                return successColor;
        }
    }};
    color: #fff;
    font-weight: bold;
    white-space: nowrap;
    text-align: center;
    ${({ isVisible }) =>
        isVisible
            ? css`
                  width: 400px;
                  padding: 15px;
                  opacity: 1;
              `
            : css`
                  width: 200px;
                  padding: 0;
                  opacity: 0;
              `}
    transition: 0.2s ease;
`;

const SnackBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [executed, setExecuted] = useState(false);
    const { type, message } = useSelector(({ snackbar }) => snackbar);
    const dispatch = useDispatch();

    useEffect(() => {
        const openTimer = setTimeout(() => {
            setIsVisible(true);
        }, 1);
        const closeTimer = setTimeout(() => {
            setIsVisible(false);
            setExecuted(true);
        }, 3000);
        return () => {
            clearTimeout(openTimer);
            clearTimeout(closeTimer);
        };
    }, []);

    useEffect(() => {
        let timer = "";
        if (executed) {
            timer = setTimeout(() => {
                dispatch(
                    setSnackbarConfig({
                        isShow: false,
                    })
                );
            }, 200);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [executed]);

    return (
        <Container isVisible={isVisible} type={type}>
            {message}
        </Container>
    );
};

export default SnackBar;
