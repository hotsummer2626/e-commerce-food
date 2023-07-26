import Filters from "./components/Filters";
import styled from "styled-components";
import ProductCard from "@/components/shares/ProductCard";
import burgerImg from "@/assets/images/burger.jpg";

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 10px 0;
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
    {
        id: 4,
        imgSrc: burgerImg,
        name: "Beef Burger",
        price: 12.99,
    },
    {
        id: 5,
        imgSrc: burgerImg,
        name: "Beef Burger",
        price: 12.99,
    },
    {
        id: 6,
        imgSrc: burgerImg,
        name: "Beef Burger",
        price: 12.99,
    },
    {
        id: 7,
        imgSrc: burgerImg,
        name: "Beef Burger",
        price: 12.99,
    },
    {
        id: 8,
        imgSrc: burgerImg,
        name: "Beef Burger",
        price: 12.99,
    },
    {
        id: 9,
        imgSrc: burgerImg,
        name: "Beef Burger",
        price: 12.99,
    },
    {
        id: 10,
        imgSrc: burgerImg,
        name: "Beef Burger",
        price: 12.99,
    },
];

const Menu = () => {
    return (
        <>
            <Filters />
            <Content>
            {productList.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Content>
        </>
    );
};

export default Menu;
