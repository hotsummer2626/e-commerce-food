import styled from "styled-components";
import { colors } from "@/styles/variables";

const { primaryColor, lightPrimaryColor } = colors;

const InputItem = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const Label = styled.label`
    display: block;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 3px;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    outline-color: ${primaryColor};
    border: 2px solid ${lightPrimaryColor};
`;

const FormSelect = ({ inputItem, onChange }) => {
    return (
        <InputItem>
            <Label htmlFor={inputItem.key}>{inputItem.label}</Label>
            <Select id={inputItem.key} onChange={onChange}>
                {inputItem.options.map((option, index) => (
                    <option value={option.value} selected={index === 0}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </InputItem>
    );
};

export default FormSelect;
