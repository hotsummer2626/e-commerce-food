import styled from "styled-components";
import Modal from "@/components/shares/Modal";
import CroppedImage from "@/components/shares/CroppedImage";
import FormInput from "@/components/shares/FormInput";
import FormSelect from "@/components/shares/FormSelect";
import LoadingSpinner from "@/components/shares/LoadingSpinner";
import { useEffect, useState } from "react";
import defaultProductImg from "@/assets/images/default-product.jpg";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "@/services/image";
import { createProduct, updateProductById } from "@/store/slices/product";
import { colors } from "@/styles/variables";
import button from "@/styles/button";

const { errorColor } = colors;

const Form = styled.form`
    width: 100%;
    margin-top: 10px;
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"] {
        -webkit-appearance: none;
    }
`;

const Error = styled.div`
    color: ${errorColor};
    font-size: 12px;
`;

const ButtonGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

const CancelButton = styled.div`
    ${button("ghost")}
    width: 100%;
    padding: 6px;
`;

const ConfirmButton = styled.button`
    ${button()}
    width: 100%;
    padding: 6px;
    border: none;
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
        type: "number",
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
            { label: "Chicken", value: "chicken" },
            { label: "Pizza", value: "pizza" },
            { label: "Seafood", value: "seafood" },
        ],
    },
];

const EditingForm = ({ editingProduct, onClose }) => {
    const [formValues, setFormValues] = useState({
        name: "",
        price: 0,
        category: "bakery",
    });
    const [productImgFile, setProductImgFile] = useState(null);
    const [validatorMessages, setValidatorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { status } = useSelector(({ product }) => product);
    const dispatch = useDispatch();

    useEffect(() => {
        if (editingProduct) {
            setFormValues({
                name: editingProduct.name || "",
                price: editingProduct.price || 0,
                category: editingProduct.category || "bakery",
            });
        }
    }, [editingProduct]);

    useEffect(
        () => () => {
            if (status === "success") {
                setIsLoading(false);
                onClose();
            }
            if (status === "failed") {
                setIsLoading(false);
            }
        },
        [status]
    );

    const onChangeHandler = (key) => (e) => {
        const hasErrorMessage = validatorMessages.find(
            (item) => item.key === key
        );

        if (hasErrorMessage) {
            setValidatorMessages((prevValidatorMessages) =>
                prevValidatorMessages.filter((item) => item.key !== key)
            );
        }

        if (key === "productImg") {
            return setProductImgFile(e);
        }

        let currentValue = e.target.value;

        if (key === "price") {
            currentValue = +currentValue;
        }

        setFormValues((prev) => ({
            ...prev,
            [key]: currentValue,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const { name, price, category } = formValues;
        const errorMessages = [];

        if (!editingProduct && !productImgFile) {
            errorMessages.push({
                key: "productImg",
            });
        }
        if (!name || !price || !category) {
            for (const inputItem of inputList) {
                if (!formValues[inputItem.key]) {
                    errorMessages.push({
                        key: inputItem.key,
                        message: "required",
                    });
                }
            }
        }

        setValidatorMessages(errorMessages);

        if (errorMessages.length === 0) {
            setIsLoading(true);
            let uploadResult = null;
            if (productImgFile) {
                uploadResult = await uploadImage({
                    file: productImgFile,
                    publicId: editingProduct?.imgSrc?.publicId || "",
                    folder: "product",
                });
            }
            const imgSrcConfig = uploadResult
                ? {
                      imgSrc: {
                          url: uploadResult.secure_url,
                          publicId: uploadResult.public_id,
                      },
                  }
                : {};
            const newProduct = {
                ...imgSrcConfig,
                name,
                price,
                category,
            };
            if (editingProduct) {
                dispatch(
                    updateProductById({
                        productId: editingProduct._id,
                        newProduct,
                    })
                );
            } else {
                dispatch(createProduct(newProduct));
            }
        }
    };

    return (
        <Modal onClose={onClose}>
            <CroppedImage
                width="100%"
                aspect={16 / 9}
                shape="square"
                initialImgSrc={editingProduct?.imgSrc?.url || defaultProductImg}
                onConfirm={onChangeHandler("productImg")}
            />
            {validatorMessages.find((item) => item.key === "productImg") && (
                <Error>required</Error>
            )}
            <Form onSubmit={onSubmitHandler}>
                {inputList.map((inputItem) => {
                    if (inputItem.key === "category") {
                        return (
                            <FormSelect
                                key={inputItem.key}
                                inputItem={inputItem}
                                value={formValues[inputItem.key]}
                                onChange={onChangeHandler(inputItem.key)}
                            />
                        );
                    }
                    return (
                        <FormInput
                            key={inputItem.key}
                            inputItem={inputItem}
                            value={formValues[inputItem.key]}
                            onChange={onChangeHandler(inputItem.key)}
                            error={validatorMessages.find(
                                (item) => item.key === inputItem.key
                            )}
                        />
                    );
                })}
                <ButtonGroup>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <ConfirmButton>
                        {isLoading && <LoadingSpinner />}
                        Confirm
                    </ConfirmButton>
                </ButtonGroup>
            </Form>
        </Modal>
    );
};

export default EditingForm;
