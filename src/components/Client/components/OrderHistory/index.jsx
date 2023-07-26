import useSignInRequired from "@/hooks/useSignInRequired";

const OrderHistory = () => {
    const { currentUser } = useSignInRequired();
    return currentUser ? <div>order history page</div> : null;
};

export default OrderHistory;
