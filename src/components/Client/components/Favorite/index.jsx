import useSignInRequired from "@/hooks/useSignInRequired";

const Favorite = () => {
    const { currentUser } = useSignInRequired();
    return currentUser ? <div>favorite page</div> : null;
};

export default Favorite;
