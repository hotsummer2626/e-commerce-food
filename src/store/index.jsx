import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import snackbarSlice from "./slices/snackbar";
import productSlice from "./slices/product";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        snackbar: snackbarSlice.reducer,
        product: productSlice.reducer,
    },
});
