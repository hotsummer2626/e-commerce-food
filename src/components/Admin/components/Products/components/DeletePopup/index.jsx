import styled from "styled-components";
import Modal from "@/components/shares/Modal";
import LoadingSpinner from "@/components/shares/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductById } from "@/store/slices/product";
import { deleteImageByPublicId } from "@/services/image";
import { setSnackbarConfig } from "@/store/slices/snackbar";
import button from "@/styles/button";
import { colors } from "@/styles/variables";
import { useEffect, useState } from "react";

const { errorColor, greyColor } = colors;

const IconWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Icon = styled.div`
    color: ${errorColor};
    font-size: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid ${errorColor};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

const Title = styled.span`
    display: block;
    width: 100%;
    font-size: 35px;
    font-weight: bold;
    text-align: center;
`;

const Description = styled.p`
    color: ${greyColor};
    text-align: center;
    margin: 20px 0 40px;
    font-size: 20px;
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

const DeletePopup = ({ editingProduct, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { status } = useSelector(({ product }) => product);
    const dispatch = useDispatch();

    useEffect(
        () => () => {
            if (status === "success") {
                setIsLoading(false);
                onClose();
            }
            if (status === "failed") {
                setIsLoading(false);
                onClose();
            }
        },
        [status]
    );

    const onDeleteHandler = async () => {
        setIsLoading(true);
        if (editingProduct) {
            try {
                await deleteImageByPublicId(editingProduct.imgSrc.publicId);
                dispatch(deleteProductById(editingProduct._id));
            } catch (error) {
                dispatch(
                    setSnackbarConfig({
                        isShow: true,
                        type: "error",
                        message: "Something unexpected happened",
                    })
                );
                setIsLoading(false);
            }
        }
    };

    return (
        <Modal onClose={onClose}>
            <IconWrapper>
                <Icon>
                    <FontAwesomeIcon icon={faXmark} />
                </Icon>
            </IconWrapper>
            <Title>Are you sure?</Title>
            <Description>{`Do you really want to delete ${
                editingProduct?.name || ""
            }`}</Description>
            <ButtonGroup>
                <CancelButton onClick={onClose}>Cancel</CancelButton>
                <ConfirmButton onClick={onDeleteHandler}>
                    {isLoading && <LoadingSpinner />}
                    Confirm
                </ConfirmButton>
            </ButtonGroup>
        </Modal>
    );
};

export default DeletePopup;
