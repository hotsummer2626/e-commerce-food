import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Transition from "@/components/shares/Transition";
import { useState } from "react";
import { colors } from "@/styles/variables";

const { primaryColor } = colors;

const Container = styled.div`
    position: relative;
`;

const Icon = styled.div`
    cursor: pointer;
    font-size: 20px;
`;

const Content = styled.div`
    position: absolute;
    z-index: 8;
    border-radius: 10px;
    transform: translateX(-50%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    overflow: hidden;
`;

const Button = styled.div`
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
        background: ${primaryColor};
        color: #fff;
    }
`;

const EditIcon = ({ onEdit, onDelete }) => {
    const [isDropdownShow, setIsDropdownShow] = useState(false);

    const onClickHandler = (actionName) => () => {
        if (actionName === "edit") {
            onEdit();
        }
        if (actionName === "delete") {
            onDelete();
        }
        setIsDropdownShow(false);
    };

    return (
        <Container>
            <Icon onClick={() => setIsDropdownShow(true)}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </Icon>
            {isDropdownShow && (
                <Transition onClose={() => setIsDropdownShow(false)}>
                    <Content>
                        <Button onClick={onClickHandler("edit")}>Edit</Button>
                        <Button onClick={onClickHandler("delete")}>
                            Delete
                        </Button>
                    </Content>
                </Transition>
            )}
        </Container>
    );
};

export default EditIcon;
