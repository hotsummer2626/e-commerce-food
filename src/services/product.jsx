import request from "@/utils/request";

export const create = (payload) =>
    request({
        method: "post",
        url: "/products",
        data: payload,
    });

export const getProducts = () =>
    request({
        method: "get",
        url: "/products",
    });

export const updateById = (productId, payload) =>
    request({
        method: "put",
        url: `/products/${productId}`,
        data: payload,
    });

export const deleteById = (productId) =>
    request({
        method: "delete",
        url: `/products/${productId}`,
    });
