import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    const user = localStorage.getItem("user");
    const expireTime = +localStorage.getItem("expireTime");
    return {
        currentUser: user ? JSON.parse(user) : null,
        expireTime: expireTime || 0,
    };
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.currentUser = action.payload;
            const currentTime = Date.now();
            const timeout = 1000 * 60 * 60 * 24 * 7;
            state.expireTime = currentTime + timeout;
            localStorage.setItem("user", JSON.stringify(state.currentUser));
            localStorage.setItem(
                "expireTime",
                JSON.stringify(state.expireTime)
            );
        },
        logout(state, action) {
            state.currentUser = null;
            state.expireTime = 0;
            localStorage.removeItem("user");
            localStorage.removeItem("expireTime");
        },
        updateUser(state, action) {
            const newUser = {
                ...state.currentUser,
                ...action.payload,
            };
            state.currentUser = newUser;
            localStorage.setItem("user", JSON.stringify(newUser));
        },
    },
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice;
