export default class Constants {
    static BASE_URL = "https://instajamaica-api.appdeft.biz/";
    static END_POINT = {
        SIGIN: "api/admin/login",

        GET_ALL_CATEGORIES: "api/admin/categories",
        ENABLE_DISABLE_CATEGORY: "api/admin/enable-disable-category/",
        USERS: "api/admin/users",
        BLOCK_UNBLOCK_USER: "api/admin/enable-disable-user/",
        GET_ADMIN_PROFILE: "api/admin/profile",
        UPDATE_ADMIN_PROFILE: "api/admin/update",
        CHANGE_PASSWORD:"api/admin/change-password",

        FOUNDATION: "api/foundation/",

        GET_CATEGORY: "api/admin/category/",
        CREATE_CATEGORY: "api/admin/create-category",
        UPDATE_CATEGORY: "api/admin/update-category/",

        SUB_CATEGORY: "api/admin/subcategory/",

        PRODUCT: "api/admin/product/",
        PRODUCTS: "api/admin/products",
        USER_PRODUCT: "api/admin/user/products/",
        CATEGORY_PRODUCT: "api/admin/category/products/",
        UPDATE_PRODUCT: "api/admin/product/update/",
    };
}
