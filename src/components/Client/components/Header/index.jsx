import styled from "styled-components";
import { useSelector } from "react-redux";
import Searchbar from "@/components/shares/Searchbar";


const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: sticky;
    top: 0;
    z-index: 99;
    background: #f5f5f5;
    padding: 40px 0 10px;
`;

const Username = styled.div`
    font-size: 30px;
    font-weight: bold;
    align-self: center;
`;

const Header = () => {
    const { currentUser } = useSelector(({ user }) => user);

    return (
        <Container>
            <Username>
                {currentUser
                    ? `Hello, ${currentUser.name.first}`
                    : "Please login"}
            </Username>
            <Searchbar placeholder="What do you want to eat today..." />
        </Container>
    );
};

export default Header;
