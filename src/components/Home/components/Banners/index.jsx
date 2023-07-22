import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import pizzaImg from "@/assets/images/pizza-banner.png";
import burgerImg from "@/assets/images/burger-banner.png";
import chickenImg from "@/assets/images/chicken-banner.png";
import { colors } from "@/styles/variables";

const { primaryColor } = colors;

const Container = styled.div`
    width: 100%;
`;

const Content = styled.div`
    width: 100%;
    border-radius: 10px;
    background: ${primaryColor};
    padding: 35px;
    color: #fff;
`;

const SpaceTop = styled.div`
    height: 30px;
`;

const Space = styled.div`
    height: 40px;
`;

const Title = styled.h2`
    font-size: 30px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    width: 50%;
    font-size: 12px;
`;

const Image = styled.img`
    width: 220px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 40px;
`;

const banners = [
    {
        img: pizzaImg,
        title: "Hot Pizza",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime aperiam fugit id, nam suscipit optio nostrum labore deserunt exercitationem sed impedit ex neque libero recusandae dolorem commodi doloribus veritatis. Eius.",
    },
    {
        img: burgerImg,
        title: "Spicy Burger",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime aperiam fugit id, nam suscipit optio nostrum labore deserunt exercitationem sed impedit ex neque libero recusandae dolorem commodi doloribus veritatis. Eius.",
    },
    {
        img: chickenImg,
        title: "Grilled Chicken",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime aperiam fugit id, nam suscipit optio nostrum labore deserunt exercitationem sed impedit ex neque libero recusandae dolorem commodi doloribus veritatis. Eius.",
    },
];

const Banners = () => {
    return (
        <Container>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                spaceBetween={60}
                loop={true}
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.title}>
                        <SpaceTop />
                        <Content>
                            <Title>{banner.title}</Title>
                            <Description>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Maxime deserunt amet minima
                                voluptates saepe, aperiam in debitis pariatur
                                rem.
                            </Description>
                            <Image src={banner.img} alt="food" />
                        </Content>
                        <Space />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
};

export default Banners;
