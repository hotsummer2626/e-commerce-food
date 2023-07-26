import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShow: false,
    type: "",
    message: "",
};

const snackbarSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSnackbarConfig(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setSnackbarConfig } = snackbarSlice.actions;

export default snackbarSlice;
