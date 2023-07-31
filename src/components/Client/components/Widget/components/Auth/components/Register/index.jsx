import styled from "styled-components";
import { register } from "@/services/user";
import button from "@/styles/button";
import { useState } from "react";
import { isEmail } from "@/utils/validators";
import LoadingSpinner from "@/components/shares/LoadingSpinner";
import FormInput from "@/components/shares/FormInput";
import { setSnackbarConfig } from "@/store/slices/snackbar";
import { useDispatch } from "react-redux";

export const Container = styled.div`
    width: 100%;
`;

export const Button = styled.button`
    ${button()}
    width: 100%;
    font-weight: bold;
    padding: 15px;
    border: none;
    margin-top: 10px;
`;

const inputList = [
    {
        key: "email",
        label: "E-mail address",
        type: "email",
        placeholder: "Please enter your email address",
    },
    {
        key: "firstName",
        label: "First name",
        type: "text",
        placeholder: "Please enter your first name",
    },
    {
        key: "lastName",
        label: "Last name",
        type: "text",
        placeholder: "Please enter your last name",
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
        firstName: "",
        lastName: "",
        password: "",
        reEnterPassword: "",
    });
    const [validatorMessages, setValidatorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const onChangeHandler = (key) => (e) => {
        const hasErrorMessage = validatorMessages.find(
            (item) => item.key === key
        );

        if (hasErrorMessage) {
            setValidatorMessages((prevValidatorMessages) =>
                prevValidatorMessages.filter((item) => item.key !== key)
            );
        }

        setFormValues((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const { email, password, firstName, lastName, reEnterPassword } =
            formValues;
        const errorMessages = [];

        if (
            !email ||
            !password ||
            !firstName ||
            !lastName ||
            !reEnterPassword
        ) {
            for (const inputItem of inputList) {
                if (!formValues[inputItem.key]) {
                    errorMessages.push({
                        key: inputItem.key,
                        message: "required",
                    });
                }
            }
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
                name: { first: firstName, last: lastName },
                password,
            })
                .then(() => {
                    setIsLoading(false);
                    setIsSignInForm(true);
                    dispatch(
                        setSnackbarConfig({
                            isShow: true,
                            type: "success",
                            message: "Successfully registered",
                        })
                    );
                })
                .catch((err) => {
                    setIsLoading(false);
                    dispatch(
                        setSnackbarConfig({
                            isShow: true,
                            type: "error",
                            message: err.response.data.error,
                        })
                    );
                });
        }
    };

    return (
        <Container>
            <form onSubmit={onSubmitHandler}>
                {inputList.map((inputItem) => (
                    <FormInput
                        key={inputItem.key}
                        inputItem={inputItem}
                        value={formValues[inputItem.key]}
                        onChange={onChangeHandler(inputItem.key)}
                        error={validatorMessages.find(
                            (item) => item.key === inputItem.key
                        )}
                    />
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
