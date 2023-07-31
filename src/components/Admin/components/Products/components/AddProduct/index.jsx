import styled from "styled-components";
import button from "@/styles/button";
import Modal from "@/components/shares/Modal";
import CroppedImage from "@/components/shares/CroppedImage";
import { useState } from "react";
import defaultProductImg from "@/assets/images/default-product.jpg";
import FormInput from "@/components/shares/FormInput";
import FormSelect from "@/components/shares/FormSelect";

const Container = styled.div`
    ${button()};
    padding: 0px 20px;
    gap: 0;
`;

const Form = styled.form`
    width: 100%;
    margin-top: 10px;
`;

const inputList = [
    {
        key: "name",
        label: "Name",
        type: "text",
        placeholder: "Please enter product name",
        required: true,
    },
    {
        key: "price",
        label: "Price",
        type: "text",
        placeholder: "Please enter product price",
        required: true,
    },
    {
        key: "category",
        label: "Category",
        type: "text",
        placeholder: "Please select a category",
        required: true,
        options: [
            { label: "Bakery", value: "bakery" },
            { label: "Burger", value: "burger" },
            { label: "Beverage", value: "beverage" },
        ],
    },
];

const AddProduct = () => {
    const [isModalShow, setIsModalShow] = useState(false);

    return (
        <>
            <Container onClick={() => setIsModalShow(true)}>
                Add Product
            </Container>
            {isModalShow && (
                <Modal onClose={() => setIsModalShow(false)}>
                    <CroppedImage
                        width="100%"
                        aspect={16 / 9}
                        shape="square"
                        initialImgSrc={defaultProductImg}
                        onConfirm={() => {}}
                    />
                    <Form>
                        {inputList.map((inputItem) => {
                            if (inputItem.key === "category") {
                                return (
                                    <FormSelect
                                        key={inputItem.key}
                                        inputItem={inputItem}
                                        onChange={(e) =>
                                            console.log(e.target.value)
                                        }
                                    />
                                );
                            }
                            return (
                                <FormInput
                                    key={inputItem.key}
                                    inputItem={inputItem}
                                    value=""
                                    onChange={() => {}}
                                    error={undefined}
                                />
                            );
                        })}
                    </Form>
                </Modal>
            )}
        </>
    );
};

export default AddProduct;
