import styled from "styled-components";
import { colors } from "@/styles/variables";

const { lightPrimaryColor } = colors;

const Spinner = styled.div`
    animation: spin 1s linear infinite;
    height: 16px;
    transition-timing-function: linear;
    width: 16px;
    border: 3px solid rgb(229 231 235);
    border-top-color: ${lightPrimaryColor};
    border-radius: 50px;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

const LoadingSpinner = () => {
    return <Spinner />;
};

export default LoadingSpinner;
