import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbarConfig } from "@/store/slices/snackbar";
import { useNavigate } from "react-router";

const useSignInRequired = () => {
    const { currentUser, status } = useSelector(({ user }) => user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentUser) {
            dispatch(
                setSnackbarConfig({
                    isShow: true,
                    type: "error",
                    message: "Please sign in",
                })
            );
            navigate("/");
        }
    }, [currentUser]);

    return { currentUser, status };
};

export default useSignInRequired;
