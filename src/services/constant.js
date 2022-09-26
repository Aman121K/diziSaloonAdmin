export default class Constants {
    static BASE_URL = "http://144.91.80.25:1001/";
    static END_POINT = {
        SIGIN: "api/admin/login",

        GET_ALL_CATEGORIES: "api/admin/categories",
        USER: "api/admin/user/",

        FOUNDATION: "api/foundation/",

        GET_CATEGORY: "api/admin/category/",
        CREATE_CATEGORY: "api/admin/create-category",
        UPDATE_CATEGORY: "api/admin/update-category/",
        ENABLE_DISABLE_CATEGORY: "api/admin/enable-disable-category/",

        SUB_CATEGORY: "api/admin/subcategory/",

        PRODUCT: "api/admin/product/",
        PRODUCTS: "api/admin/products",
        USER_PRODUCT: "api/admin/user/products/",
        CATEGORY_PRODUCT: "api/admin/category/products/",
        UPDATE_PRODUCT: "api/admin/product/update/",
    };
}
