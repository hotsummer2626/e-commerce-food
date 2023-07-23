import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/styles/variables";
import { useSelector } from "react-redux";

const { primaryColor } = colors;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 99;
    background: #f5f5f5;
    padding: 40px 0 10px;
`;

const Username = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const InputWrapper = styled.div`
    display: flex;
    background: #fff;
    align-items: center;
    border-radius: 10px;
    gap: 8px;
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
    width: 300px;
`;

const Searchbar = () => {
    const { currentUser } = useSelector(({ user }) => user);

    return (
        <Container>
            <Username>
                {currentUser
                    ? `Hello, ${currentUser.name.first}`
                    : "Please login"}
            </Username>
            <InputWrapper>
                <IconWrapper>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </IconWrapper>
                <Input
                    type="text"
                    placeholder="What do you want to eat today..."
                />
            </InputWrapper>
        </Container>
    );
};

export default Searchbar;
