import styled from "styled-components";
import { colors } from "@/styles/variables";

const { primaryColor, lightPrimaryColor, errorColor } = colors;

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

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    outline-color: ${primaryColor};
    border: 2px solid ${lightPrimaryColor};
`;

const Error = styled.div`
    color: ${errorColor};
    font-size: 12px;
`;

const FormInput = ({ inputItem, value, onChange, error }) => {
    return (
        <InputItem>
            <Label htmlFor={inputItem.key}>{inputItem.label}</Label>
            <Input
                id={inputItem.key}
                type={inputItem.type}
                value={value}
                onChange={onChange}
                placeholder={inputItem.placeholder}
                autoComplete={
                    inputItem.type === "password" ? "new-password" : ""
                }
            />
            {error && <Error>{error.message}</Error>}
        </InputItem>
    );
};

export default FormInput;
