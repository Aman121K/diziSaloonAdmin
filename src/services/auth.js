export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

export const authenticate = (res, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("name", JSON.stringify(res.data.name));
        localStorage.setItem("jwt", JSON.stringify(res.data.token));
        next();
    }
};

export const logout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.clear();
        next();
    }
};
