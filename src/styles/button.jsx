import { css } from "styled-components";
import { colors } from "./variables";

const { primaryColor } = colors;

const button = (variant) => css`
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    ${() => {
        switch (variant) {
            case "outlined":
                return css`
                    color: ${primaryColor};
                    border: 1px solid ${primaryColor};
                `;
            case "ghost":
                return css`
                    color: ${primaryColor};
                `;
            default:
                return css`
                    background: ${primaryColor};
                    color: #fff;
                `;
        }
    }}
`;

export default button;
