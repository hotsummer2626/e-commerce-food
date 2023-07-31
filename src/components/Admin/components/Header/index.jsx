import styled from "styled-components";
import Searchbar from "@/components/shares/Searchbar";
import useSignInRequired from "@/hooks/useSignInRequired";
import defaultAvatarImg from "@/assets/images/default-avatar.jpg";
import { useLocation } from "react-router";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    position: sticky;
    top: 0;
    z-index: 99;
    background: #f5f5f5;
    padding: 40px 0 10px;
    gap: 40px;
`;

const Title = styled.h3`
    font-size: 30px;
    align-self: center;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Avatar = styled.img`
    width: 40px;
    border-radius: 50%;
`;

const Username = styled.span`
    font-size: 20px;
    font-weight: bold;
`;

const getTitle = (path) => {
    switch (path) {
        case "/admin/products":
            return "Products";
        default:
            return "Dashboard";
    }
};

const Header = () => {
    const { currentUser } = useSignInRequired();
    const location = useLocation();
    return (
        <Container>
            <Title>{getTitle(location.pathname)}</Title>
            <Searchbar placeholder="Please input the product name" />
            <UserInfo>
                <Avatar
                    src={currentUser?.avatar?.url || defaultAvatarImg}
                    alt="avatar"
                />
                <Username>{`${currentUser?.name?.first || ""} ${
                    currentUser?.name?.last || ""
                }`}</Username>
            </UserInfo>
        </Container>
    );
};

export default Header;
