import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/styles/variables";
import { useState } from "react";

const { primaryColor, lightPrimaryColor, greyColor } = colors;

const Container = styled.div`
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    position: relative;
`;

const Image = styled.img`
    width: 100%;
`;

const Details = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

const Name = styled.span`
    display: block;
    font-size: 15px;
    margin-bottom: 10px;
`;

const Price = styled.span`
    font-weight: bold;
`;

const ButtonsWrapper = styled.div`
    width: ${({ isInShoppingCart }) => (isInShoppingCart ? "105px" : "35px")};
    border-radius: 10px;
    overflow: hidden;
    transition: 0.3s ease;
    display: flex;
    justify-content: right;
`;

const Buttons = styled.div`
    display: flex;
    background: ${primaryColor};
    width: max-content;
    height: max-content;
    color: #fff;
`;

const Icon = styled.div`
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Quantity = styled(Icon)`
    cursor: initial;
    user-select: none;
`;

const HeartIcon = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    color: ${({ isActive }) => (isActive ? lightPrimaryColor : greyColor)};
    cursor: pointer;
    font-size: 20px;
`;

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(0);
    return (
        <Container>
            <Image src={product.imgSrc} alt="food" />
            <Name>{product.name}</Name>
            <Details>
                <Price>{`A$${product.price}`}</Price>
                <ButtonsWrapper isInShoppingCart={quantity !== 0}>
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
                </ButtonsWrapper>
            </Details>
            <HeartIcon isActive={false}>
                <FontAwesomeIcon icon={faHeart} />
            </HeartIcon>
        </Container>
    );
};

export default ProductCard;
