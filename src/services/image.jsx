import request from "@/utils/request";

export const uploadImage = (payload) => {
    const { file, publicId, folder } = payload;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("publicId", publicId);
    formData.append("folder", folder);
    return request({
        method: "post",
        url: "/images",
        data: formData,
    });
};

export const deleteImageByPublicId = (publicId) =>
    request({
        method: "delete",
        url: "/images",
        data: { publicId },
    });
