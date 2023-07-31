import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/styles/variables";

const { primaryColor } = colors;

const Container = styled.div`
    display: flex;
    background: #fff;
    align-items: center;
    border-radius: 10px;
    gap: 8px;
    width: 100%;
`;

const IconWrapper = styled.div`
    color: ${primaryColor};
    padding-left: 20px;
`;

const Input = styled.input`
    padding: 5px;
    font-size: 16px;
    outline: none;
    border: none;
    background: transparent;
    flex-grow: 1;
`;

const Searchbar = ({ value, onChange, placeholder }) => {
    return (
        <Container>
            <IconWrapper>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </IconWrapper>
            <Input
                type="text"
                // value={value}
                // onChange={onChange}
                placeholder={placeholder}
            />
        </Container>
    );
};

export default Searchbar;
