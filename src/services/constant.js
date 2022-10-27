export default class Constants {
    static BASE_URL = "http://localhost:1001/";
    // static BASE_URL = "https://instajamaica-api.appdeft.biz/";
    static END_POINT = {
        SIGIN: "api/admin/login",

        GET_ALL_CATEGORIES: "api/admin/categories",
        ENABLE_DISABLE_CATEGORY: "api/admin/enable-disable-category/",
        USERS: "api/admin/users",
        BLOCK_UNBLOCK_USER: "api/admin/enable-disable-user/",
        GET_ADMIN_PROFILE: "api/admin/profile",
        UPDATE_ADMIN_PROFILE: "api/admin/update",
        CHANGE_PASSWORD: "api/admin/change-password",
        FORGOT_PASSWORD: "api/admin/forgot-password",
        RESET_PASSWORD: "api/admin/change-forgot-password",

        PROVIDERS: "api/admin/providers",
        BLOCK_UNBLOCK_PROVIDER: "api/admin/enable-disable-provider/",
    };
}
