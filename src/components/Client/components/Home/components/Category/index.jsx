import styled from "styled-components";
import Section from "@/components/shares/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCookie,
    faBurger,
    faMugHot,
    faDrumstickBite,
    faPizzaSlice,
    faFish,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/styles/variables";

const { primaryColor } = colors;

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
`;

const CategoryItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: ${primaryColor};
    aspect-ratio: 1;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    font-size: 30px;
    cursor: pointer;
    & span {
        font-size: 15px;
        color: initial;
    }
`;

const categoryList = [
    { icon: faCookie, name: "Bakery" },
    { icon: faBurger, name: "Burger" },
    { icon: faMugHot, name: "Beverage" },
    { icon: faDrumstickBite, name: "Chicken" },
    { icon: faPizzaSlice, name: "Pizza" },
    { icon: faFish, name: "Seafood" },
];

const Category = () => {
    return (
        <Section title="Category">
            <Content>
                {categoryList.map((item) => (
                    <CategoryItem key={item.name}>
                        <FontAwesomeIcon icon={item.icon} />
                        <span>{item.name}</span>
                    </CategoryItem>
                ))}
            </Content>
        </Section>
    );
};

export default Category;
