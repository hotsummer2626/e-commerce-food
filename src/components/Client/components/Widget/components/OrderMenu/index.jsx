import styled from "styled-components";
import burgerImg from "@/assets/images/burger.jpg";
import OrderItem from "./components/OrderItem";
import { colors } from "@/styles/variables";
import button from "@/styles/button";

const { greyColor } = colors;

const Container = styled.div`
    width: 100%;
`;

const Title = styled.h2`
    font-size: 20px;
    margin-bottom: 10px;
`;

const OrdersWrapper = styled.ul`
    max-height: 180px;
    overflow-y: auto;
    margin-bottom: 20px;
`;

const Delivery = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 10px;
    & span:first-child {
        color: ${greyColor};
    }
`;

const Total = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 10px;
`;

const Button = styled.div`
    ${button()}
    width: 100%;
    font-weight: bold;
    padding: 15px;
`;

const orders = [
    { id: 1, imgSrc: burgerImg, name: "Beef Burger", price: 12.99 },
    { id: 2, imgSrc: burgerImg, name: "Beef Burger", price: 12.99 },
    { id: 3, imgSrc: burgerImg, name: "Beef Burger", price: 12.99 },
    { id: 4, imgSrc: burgerImg, name: "Beef Burger", price: 12.99 },
];

const OrderMenu = () => {
    return (
        <Container>
            <Title>Order Menu</Title>
            <OrdersWrapper>
                {orders.map((orderItem) => (
                    <OrderItem key={orderItem.id} orderItem={orderItem} />
                ))}
            </OrdersWrapper>
            <Delivery>
                <span>Delivery Fee</span>
                <span>Free</span>
            </Delivery>
            <Total>
                <span>Total</span>
                <span>A$12.99</span>
            </Total>
            <Button>Place Order</Button>
        </Container>
    );
};

export default OrderMenu;
