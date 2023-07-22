import styled from "styled-components";
import { register } from "@/services/user";
import button from "@/styles/button";
import { colors } from "@/styles/variables";
import { useState } from "react";
import { isEmail } from "@/utils/validators";
import LoadingSpinner from "@/components/shares/LoadingSpinner";

const { primaryColor, lightPrimaryColor, errorColor } = colors;

export const Container = styled.div`
    width: 100%;
`;

export const InputItem = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

export const Label = styled.label`
    display: block;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 3px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    outline-color: ${primaryColor};
    border: 2px solid ${lightPrimaryColor};
`;

export const Button = styled.button`
    ${button()}
    width: 100%;
    font-weight: bold;
    padding: 15px;
    border: none;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

export const Error = styled.div`
    color: ${errorColor};
    font-size: 12px;
`;

const inputList = [
    {
        key: "email",
        label: "E-mail address",
        type: "email",
        placeholder: "Please enter your email address",
    },
    {
        key: "password",
        label: "Enter password",
        type: "password",
        placeholder: "Please enter your password",
    },
    {
        key: "reEnterPassword",
        label: "Enter password again",
        type: "password",
        placeholder: "Please enter your password again",
    },
];

const Register = ({ setIsSignInForm }) => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        reEnterPassword: "",
    });
    const [validatorMessages, setValidatorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onChangeHandler = (key) => (e) => {
        setFormValues((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const { email, password, reEnterPassword } = formValues;
        const errorMessages = [];

        if (!email) {
            errorMessages.push({
                key: "email",
                message: "required",
            });
        }
        if (!password) {
            errorMessages.push({
                key: "password",
                message: "required",
            });
        }
        if (email && !isEmail(email)) {
            errorMessages.push({
                key: "email",
                message: "Invalid email",
            });
        }
        if (password !== reEnterPassword) {
            errorMessages.push({
                key: "reEnterPassword",
                message: "Passwords do not match",
            });
        }

        setValidatorMessages(errorMessages);

        if (errorMessages.length === 0) {
            setIsLoading(true);
            register({
                email,
                password,
            })
                .then((res) => {
                    setIsLoading(false);
                    setIsSignInForm(true);
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <Container>
            <form onSubmit={onSubmitHandler}>
                {inputList.map((inputItem) => (
                    <InputItem key={inputItem.key}>
                        <Label htmlFor={inputItem.key}>{inputItem.label}</Label>
                        <Input
                            id={inputItem.key}
                            type={inputItem.type}
                            value={formValues[inputItem.key]}
                            onChange={onChangeHandler(inputItem.key)}
                            placeholder={inputItem.placeholder}
                            autoComplete={
                                inputItem.type === "password"
                                    ? "new-password"
                                    : ""
                            }
                        />
                        {validatorMessages.find(
                            (item) => item.key === inputItem.key
                        ) && (
                            <Error>
                                {
                                    validatorMessages.find(
                                        (item) => item.key === inputItem.key
                                    ).message
                                }
                            </Error>
                        )}
                    </InputItem>
                ))}
                <Button>
                    {isLoading && <LoadingSpinner />}
                    Sign Up
                </Button>
            </form>
        </Container>
    );
};

export default Register;
