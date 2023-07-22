import { Container, InputItem, Label, Input, Button } from "../Register";

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
    return (
        <Container>
            <form>
                {inputList.map((inputItem) => (
                    <InputItem key={inputItem.key}>
                        <Label htmlFor={inputItem.key}>{inputItem.label}</Label>
                        <Input
                            id={inputItem.key}
                            type={inputItem.type}
                            placeholder={inputItem.placeholder}
                        />
                    </InputItem>
                ))}
            </form>
            <Button>Sign In</Button>
        </Container>
    );
};

export default Login;
