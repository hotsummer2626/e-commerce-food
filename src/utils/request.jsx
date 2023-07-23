import axios from "axios";

const request = ({ method, url, data }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    return axios({
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
        baseURL: `${process.env.SERVER_DOMAIN}/api`,
        method,
        url,
        data,
    }).then((res) => res.data);
};

export default request;
