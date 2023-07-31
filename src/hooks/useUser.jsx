import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { logout } from "@/store/slices/user";
import { setSnackbarConfig } from "@/store/slices/snackbar";

const useUser = () => {
    const { currentUser, status, error, success, expireTime } = useSelector(
        ({ user }) => user
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = expireTime - Date.now();
        if (timeout < 10000) {
            dispatch(logout());
            return;
        }
        const timer = setTimeout(() => {
            dispatch(logout());
        }, timeout);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (currentUser?.role === "admin") {
            navigate("/admin/products");
        }
    }, [currentUser]);

    useEffect(() => {
        if (status === "failed" && error) {
            dispatch(
                setSnackbarConfig({
                    isShow: true,
                    type: "error",
                    message: error,
                })
            );
        }
        if (status === "success" && success) {
            dispatch(
                setSnackbarConfig({
                    isShow: true,
                    type: "success",
                    message: success,
                })
            );
        }
    }, [status, error]);
};

export default useUser;
