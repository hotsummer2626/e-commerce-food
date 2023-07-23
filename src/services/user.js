import request from "@/utils/request";

export const register = (payload) =>
    request({
        method: "post",
        url: "/users/register",
        data: payload,
    });

export const login = (payload) =>
    request({
        method: "post",
        url: "/users/login",
        data: payload,
    });

export const updateUserById = (userId, payload) =>
    request({
        method: "put",
        url: `/users/${userId}`,
        data: payload,
    });
