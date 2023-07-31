import { useState } from "react";
import { Container, Button } from "../Register";
import LoadingSpinner from "@/components/shares/LoadingSpinner";
import FormInput from "@/components/shares/FormInput";
import { isEmail } from "@/utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/store/slices/user";

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
];

const Login = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [validatorMessages, setValidatorMessages] = useState([]);
    const { status } = useSelector(({ user }) => user);
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
        const { email, password } = formValues;
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

        setValidatorMessages(errorMessages);

        if (errorMessages.length === 0) {
            dispatch(userLogin({ email, password }));
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
                    {status === "pending" && <LoadingSpinner />}
                    Sign Up
                </Button>
            </form>
        </Container>
    );
};

export default Login;
