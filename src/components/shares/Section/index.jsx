import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/styles/variables";

const { primaryColor } = colors;

const Container = styled.section`
    width: 100%;
    margin-bottom: 25px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const Title = styled.h2`
    font-size: 20px;
`;

const ViewAllButton = styled.div`
    color: ${primaryColor};
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    & span {
        font-size: 12px;
    }
`;

const Section = ({ children, title, onViewAll }) => {
    return (
        <Container>
            <Header>
                <Title>{title}</Title>
                <ViewAllButton onClick={onViewAll}>
                    View all
                    <span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                </ViewAllButton>
            </Header>
            {children}
        </Container>
    );
};

export default Section;
