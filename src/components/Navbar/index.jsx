import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faUtensils,
    faHeart,
    faClockRotateLeft,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import logoImg from "@/assets/images/logo.jpg";
import { colors } from "@/styles/variables";
import button from "@/styles/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/user";
import { setSnackbarConfig } from "@/store/slices/snackbar";

const { primaryColor } = colors;

const Container = styled.div`
    padding: 40px 40px;
    width: 300px;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    @media (max-width: 576px) {
        display: none;
    }
`;

const LogoWrapper = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    margin-bottom: 20px;
    border: 5px solid ${primaryColor};
`;

const Logo = styled.img`
    position: absolute;
    width: 160px;
    transform: translate(-44.5px, -15.5px);
`;

const NavLinks = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Link = styled.li`
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    padding: 15px 30px;
    & span {
        margin-left: 15px;
    }
    ${({ active }) =>
        active
            ? css`
                  background: ${primaryColor};
                  color: #fff;
              `
            : css`
                  background: #fff;
                  color: gray;
              `}
`;

const Logout = styled.div`
    ${button("outlined")};
    padding: 15px;
    margin-top: auto;
    font-weight: bold;
`;

const links = [
    {
        icon: faHouse,
        label: "Home",
        name: "",
    },
    {
        icon: faUtensils,
        label: "Menu",
        name: "menu",
    },
    {
        icon: faHeart,
        label: "Favorite",
        name: "favorite",
        signInRequired: true,
    },
    {
        icon: faClockRotateLeft,
        label: "Order History",
        name: "orderHistory",
        signInRequired: true,
    },
    {
        icon: faUser,
        label: "My Profile",
        name: "profile",
        signInRequired: true,
    },
];

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useSelector(({ user }) => user);
    const dispatch = useDispatch();

    return (
        <Container>
            <LogoWrapper>
                <Logo src={logoImg} alt="logo" />
            </LogoWrapper>
            <NavLinks>
                {links.map((link) => (
                    <Link
                        key={link.name}
                        active={location.pathname === `/${link.name}`}
                        onClick={() => {
                            if (link.signInRequired && !currentUser) {
                                return dispatch(
                                    setSnackbarConfig({
                                        isShow: true,
                                        type: "error",
                                        message: "Please sign in",
                                    })
                                );
                            }
                            navigate(`/${link.name}`);
                        }}
                    >
                        <FontAwesomeIcon icon={link.icon} />
                        <span>{link.label}</span>
                    </Link>
                ))}
            </NavLinks>
            {currentUser && (
                <Logout onClick={() => dispatch(logout())}>Logout</Logout>
            )}
        </Container>
    );
};

export default Navbar;
