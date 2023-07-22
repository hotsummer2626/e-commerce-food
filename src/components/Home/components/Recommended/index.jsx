import styled from "styled-components";
import Section from "@/components/shares/Section";
import ProductCard from "@/components/shares/ProductCard";
import burgerImg from "@/assets/images/burger.jpg";

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
`;

const productList = [
    {
        id: 1,
        imgSrc: burgerImg,
        name: "Beef Burger spicy",
        price: 12.99,
    },
    {
        id: 2,
        imgSrc: burgerImg,
        name: "Beef Burger",
        price: 12.99,
    },
    {
        id: 3,
        imgSrc: burgerImg,
        name: "Beef Burger",
        price: 12.99,
    },
];

const Recommended = () => {
    return (
        <Section title="Recommended for you">
            <Content>
                {productList.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Content>
        </Section>
    );
};

export default Recommended;
