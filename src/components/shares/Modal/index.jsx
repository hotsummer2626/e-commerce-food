import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
    opacity: ${({ isShow }) => (isShow ? "1" : "0")};
    position: fixed;
    top: 10vh;
    left: calc(50vw - 250px);
    z-index: 9999;
    width: 100%;
    max-width: 500px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
    transition: opacity 0.3s ease;
`;

const Modal = ({ onClose, children }) => {
    const [isShow, setIsShow] = useState(false);
    const transitionRef = useRef(null);

    useEffect(() => {
        setIsShow(true);
    }, []);

    useEffect(() => {
        const transition = transitionRef.current;
        const clickEvent = (e) => {
            if (
                e.target !== transition &&
                !transition.contains(e.target) &&
                isShow
            ) {
                setIsShow(false);
                setTimeout(() => {
                    onClose();
                }, 300);
            }
        };
        if (isShow) {
            document.addEventListener("click", clickEvent);
        }
        return () => {
            document.removeEventListener("click", clickEvent);
        };
    }, [isShow]);

    return (
        <Container isShow={isShow} ref={transitionRef}>
            {children}
        </Container>
    );
};

export default Modal;
