import styled from "styled-components";
import FormInput from "@/components/shares/FormInput";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import button from "@/styles/button";
import LoadingSpinner from "@/components/shares/LoadingSpinner";
import { isEmail, isPhoneNumber } from "@/utils/validators";
import { updateUserById } from "@/store/slices/user";
import CroppedImage from "@/components/shares/CroppedImage";
import defaultAvatarImg from "@/assets/images/default-avatar.jpg";
import { uploadImage } from "@/services/image";
import useSignInRequired from "@/hooks/useSignInRequired";

const Container = styled.div`
    width: 100%;
`;

const Avatar = styled.div`
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: center;
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
        avatar: {
            url: "",
            publicId: "",
        },
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [validatorMessages, setValidatorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useSignInRequired();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            setFormValues({
                avatar:
                    currentUser.avatar?.url && currentUser.avatar?.publicId
                        ? currentUser.avatar
                        : {
                              url: defaultAvatarImg,
                              publicId: "",
                          },
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

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { avatar, firstName, lastName, email, phone, address } =
            formValues;
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
            let uploadResult = null;
            if (avatarFile) {
                uploadResult = await uploadImage({
                    file: avatarFile,
                    publicId: avatar?.publicId || "",
                    folder: "logo",
                });
            }
            const avatarConfig = uploadResult
                ? {
                      avatar: {
                          url: uploadResult.secure_url,
                          publicId: uploadResult.public_id,
                      },
                  }
                : {};
            const newUser = {
                ...avatarConfig,
                name: {
                    first: firstName,
                    last: lastName,
                },
                email,
                phone,
                address,
            };
            dispatch(
                updateUserById({
                    userId: currentUser._id,
                    newUser,
                })
            );
        }
        setIsLoading(false);
    };

    return currentUser ? (
        <Container>
            <Avatar>
                <CroppedImage
                    initialImgSrc={formValues.avatar?.url}
                    width="120px"
                    aspect={1}
                    shape="round"
                    onConfirm={(croppedImgFile) =>
                        setAvatarFile(croppedImgFile)
                    }
                />
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
    ) : null;
};

export default Profile;
