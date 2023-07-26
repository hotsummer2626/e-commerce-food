import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import button from "@/styles/button";
import { colors } from "@/styles/variables";
import { useState } from "react";
import Transition from "@/components/shares/Transition";

const { greyColor } = colors;

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
    width: 250px;
    border-radius: 10px;
    background: #fff;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 105%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
`;

const OptionWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid ${greyColor};
`;

const Option = styled.div`
    ${button("outlined")};
    padding: 3px;
`;

const ButtonGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

const CancelButton = styled.div`
    ${button("ghost")}
    width: 100%;
    padding: 3px;
`;

const ApplyButton = styled.div`
    ${button()}
    width: 100%;
    padding: 3px;
`;

const FilterItem = ({ filterName, options }) => {
    const [isPopupShow, setIsPopupShow] = useState(false);

    return (
        <Container>
            <Button onClick={() => setIsPopupShow((prev) => !prev)}>
                <span>{filterName}</span>
                <FontAwesomeIcon icon={faAngleDown} />
            </Button>
            {isPopupShow && (
                <Transition onClose={() => setIsPopupShow(false)}>
                    <Popup isShow={isPopupShow}>
                        <OptionWrapper>
                            {options.map((option) => (
                                <Option key={option.label}>
                                    {option.label}
                                </Option>
                            ))}
                        </OptionWrapper>
                        <ButtonGroup>
                            <CancelButton>Cancel</CancelButton>
                            <ApplyButton>Apply</ApplyButton>
                        </ButtonGroup>
                    </Popup>
                </Transition>
            )}
        </Container>
    );
};

export default FilterItem;
