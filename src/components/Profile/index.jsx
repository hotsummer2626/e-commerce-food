import styled from "styled-components";
import avatarImg from "@/assets/images/avatar.jpg";
import FormInput from "../shares/FormInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import button from "@/styles/button";
import LoadingSpinner from "../shares/LoadingSpinner";
import { updateUserById } from "@/services/user";
import { isEmail, isPhoneNumber } from "@/utils/validators";
import { updateUser } from "@/store/slices/user";

const Container = styled.div`
    width: 100%;
`;

const Avatar = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
`;

const Image = styled.img`
    width: 120px;
    border-radius: 50%;
`;

const Form = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

const InputWrapper = styled.div`
    grid-column: ${({ fullWidth }) => (fullWidth ? "1 / span 2" : "")};
`;

export const Button = styled.button`
    ${button()}
    width: 50%;
    font-weight: bold;
    padding: 15px;
    border: none;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

const inputList = [
    {
        key: "firstName",
        label: "First name",
        type: "text",
        placeholder: "Please enter your first name",
        required: true,
    },
    {
        key: "lastName",
        label: "Last name",
        type: "text",
        placeholder: "Please enter your last name",
        required: true,
    },
    {
        key: "email",
        label: "E-mail address",
        type: "email",
        placeholder: "Please enter your email address",
        fullWidth: true,
        required: true,
    },
    {
        key: "phone",
        label: "Phone number",
        type: "phone",
        placeholder: "Please enter your phone number",
        fullWidth: true,
    },
    {
        key: "address",
        label: "Address",
        type: "address",
        placeholder: "Please enter your address",
        fullWidth: true,
    },
];

const Profile = () => {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });
    const [validatorMessages, setValidatorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useSelector(({ user }) => user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            setFormValues({
                firstName: currentUser.name?.first || "",
                lastName: currentUser.name?.last || "",
                email: currentUser.email || "",
                phone: currentUser.phone || "",
                address: currentUser.address || "",
            });
        }
    }, [currentUser]);

    const onChangeHandler = (key) => (e) => {
        const hasErrorMessage = validatorMessages.find(
            (item) => item.key === key
        );

        if (hasErrorMessage) {
            setValidatorMessages((prevValidatorMessages) =>
                prevValidatorMessages.filter((item) => item.key !== key)
            );
        }

        let currentValue = e.target.value;

        if (key === "phone") {
            currentValue = currentValue.replace(/\D/g, "");
        }

        setFormValues((prev) => ({
            ...prev,
            [key]: currentValue,
        }));
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, phone, address } = formValues;
        const errorMessages = [];

        if (!firstName || !lastName || !email) {
            for (const inputItem of inputList) {
                if (inputItem.required && !formValues[inputItem.key]) {
                    errorMessages.push({
                        key: inputItem.key,
                        message: "required",
                    });
                }
            }
        }
        if (email && !isEmail) {
            errorMessages.push({
                key: "email",
                message: "Invalid email",
            });
        }
        if (phone && !isPhoneNumber(phone)) {
            errorMessages.push({
                key: "phone",
                message: "Invalid phone number",
            });
        }

        setValidatorMessages(errorMessages);

        if (currentUser && errorMessages.length === 0) {
            setIsLoading(true);
            updateUserById(currentUser._id, {
                name: {
                    first: firstName,
                    last: lastName,
                },
                email,
                phone,
                address,
            })
                .then((res) => {
                    setIsLoading(false);
                    dispatch(updateUser(res));
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err);
                });
        }
    };

    return (
        <Container>
            <Avatar>
                <Image src={avatarImg} alt="avatar" />
            </Avatar>
            <Form onSubmit={onSubmitHandler}>
                {inputList.map((inputItem) => (
                    <InputWrapper
                        key={inputItem.key}
                        fullWidth={inputItem.fullWidth}
                    >
                        <FormInput
                            inputItem={inputItem}
                            value={formValues[inputItem.key]}
                            onChange={onChangeHandler(inputItem.key)}
                            error={validatorMessages.find(
                                (item) => item.key === inputItem.key
                            )}
                        />
                    </InputWrapper>
                ))}
                <Button>
                    {isLoading && <LoadingSpinner />}
                    Save
                </Button>
            </Form>
        </Container>
    );
};

export default Profile;
