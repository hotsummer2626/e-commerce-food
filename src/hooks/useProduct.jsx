import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSnackbarConfig } from "@/store/slices/snackbar";

const useProduct = () => {
    const { status, error, success } = useSelector(({ product }) => product);
    const dispatch = useDispatch();

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
    }, [status, error, success]);
};

export default useProduct;
