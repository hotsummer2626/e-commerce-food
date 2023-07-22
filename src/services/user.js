import axios from "axios";

export const register = (payload) =>
    axios({
        method: "post",
        url: `${process.env.SERVER_DOMAIN}/api/users/register`,
        data: payload,
    }).then((res) => res.data);
