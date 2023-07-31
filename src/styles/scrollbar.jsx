import { css } from "styled-components";
import { colors } from "./variables";

const { lightPrimaryColor } = colors;

const scrollbar = () => css`
    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${lightPrimaryColor};
        border-radius: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;

export default scrollbar;
