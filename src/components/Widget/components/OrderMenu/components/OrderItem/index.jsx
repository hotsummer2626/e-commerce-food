import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/styles/variables";
import { useState } from "react";

const { primaryColor, greyColor } = colors;

const Container = styled.div`
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid ${greyColor};
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Image = styled.img`
    width: 60px;
`;

const NameAndButtons = styled.div``;

const Name = styled.span`
    font-size: 15px;
    margin-bottom: 5px;
    display: block;
`;

const Buttons = styled.div`
    display: flex;
    background: ${primaryColor};
    width: max-content;
    height: max-content;
    color: #fff;
    border-radius: 5px;
    font-size: 12px;
`;

const Icon = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Quantity = styled(Icon)`
    cursor: initial;
    user-select: none;
`;

const Price = styled.div`
    margin-left: auto;
    & span {
        color: ${primaryColor};
        margin-right: 2px;
    }
`;

const OrderItem = ({ orderItem }) => {
    const [quantity, setQuantity] = useState(0);
    return (
        <Container>
            <Image src={orderItem.imgSrc} alt="food" />
            <NameAndButtons>
                <Name>{orderItem.name}</Name>
                <Buttons>
                    <Icon
                        onClick={() =>
                            setQuantity((prev) =>
                                prev === 0 ? prev : prev - 1
                            )
                        }
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </Icon>
                    <Quantity>{quantity}</Quantity>
                    <Icon onClick={() => setQuantity((prev) => prev + 1)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Icon>
                </Buttons>
            </NameAndButtons>
            <Price>
                <span>$</span>
                {orderItem.price}
            </Price>
        </Container>
    );
};

export default OrderItem;
