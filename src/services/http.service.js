import axios from "axios";
import Constants from "./constant";
import { isAuthenticated } from "./auth";

export const getData = (url,token) => {
    return axios
        .get(Constants.BASE_URL + url.toString(), {
            headers: {
                "Content-Type": "application/json",
                Authorization:token,
            },
        })
        .then((response) => {
            console.log("All user data >>",response)
            if (response.status === 401) {
                localStorage.removeItem("jwt");
            }
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                localStorage.removeItem("jwt");
            }
            return error;
        });
};
export const postData = (url, body) => {
    console.log("body>>",url,body)
    return axios
        .post(Constants.BASE_URL + url.toString(), body, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log("login resposne>>",response)
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};
export const postData1 = (url, body,token) => {
    console.log("all records>>",url,body,token)
    return axios
        .post(Constants.BASE_URL + url.toString(), body, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: token,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};

export const putData = (url, body) => {
    return axios
        .put(Constants.BASE_URL + url.toString(), body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated()}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};
export const putData1 = (url, body) => {
    return axios
        .put(Constants.BASE_URL + url.toString(), body, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${isAuthenticated()}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};
export const patchData = (url, body) => {
    return axios
        .patch(Constants.BASE_URL + url.toString(), body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated()}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};
export const deleteData = (url, body) => {
    return axios
        .delete(
            Constants.BASE_URL + url.toString(),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuthenticated()}`,
                },
            },
            body
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};
export const uploadFile = (url, body) => {
    return axios
        .post(
            Constants.BASE_URL + url.toString()(),
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${isAuthenticated()}`,
                },
            },
            body
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};
