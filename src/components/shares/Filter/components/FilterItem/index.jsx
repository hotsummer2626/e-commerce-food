import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import button from "@/styles/button";
import { useState } from "react";
import Transition from "@/components/shares/Transition";

const Container = styled.div`
    position: relative;
`;

const Button = styled.div`
    ${button("outlined")};
    width: 120px;
    padding: 6px;
    & span {
        margin-right: 5px;
    }
`;

const Popup = styled.div`
    position: absolute;
    z-index: 99;
    width: 100%;
    border-radius: 10px;
    background: #fff;
    bottom: 0;
    transform: translateY(105%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Option = styled.div`
    ${button("outlined")};
    padding: 3px;
`;

const FilterItem = ({ value, filterItem, setFilterValues }) => {
    const [isPopupShow, setIsPopupShow] = useState(false);

    const onClickHandler = (option) => () => {
        setFilterValues((prev) => ({
            ...prev,
            [filterItem.key]: option,
        }));
        setIsPopupShow(false);
    };

    return (
        <Container>
            <Button onClick={() => setIsPopupShow((prev) => !prev)}>
                <span>
                    {value && value !== "All" ? value : filterItem.name}
                </span>
                <FontAwesomeIcon icon={faAngleDown} />
            </Button>
            {isPopupShow && (
                <Transition onClose={() => setIsPopupShow(false)}>
                    <Popup isShow={isPopupShow}>
                        {filterItem.options.map((option) => (
                            <Option
                                key={option.value}
                                onClick={onClickHandler(option.value)}
                            >
                                {option.label}
                            </Option>
                        ))}
                    </Popup>
                </Transition>
            )}
        </Container>
    );
};

export default FilterItem;
