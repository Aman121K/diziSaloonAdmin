export default class Constants {
    // static BASE_URL = "http://localhost:1001/";
    static BASE_URL = "http://43.204.144.93:5001/api/v1/";
    static END_POINT = {
        SIGIN: "login",
        CREATE_CATEGORY: "admin/category",
        GET_ALL_CATEGORIES: "get-categories",
        CREATE_STYLES:'admin/styles',
        GET_ALL_STYLES:'get-styles',
        CREATE_ADS:'admin/ads',
        GET_ALL_ADS:'get-ads',
        CREATE_ARTICAL:'admin/articles',
        GET_ALL_ARTICAL:'get-articles',
        ENABLE_DISABLE_CATEGORY: "api/admin/enable-disable-category/",
        USERS: "get-all-users",
        BLOCK_UNBLOCK_USER: "api/admin/enable-disable-user/",
        GET_ADMIN_PROFILE: "api/admin/profile",
        UPDATE_ADMIN_PROFILE: "api/admin/update",
        CHANGE_PASSWORD: "api/admin/change-password",
        FORGOT_PASSWORD: "api/admin/forgot-password",
        RESET_PASSWORD: "api/admin/change-forgot-password",
        UPDATE_CATEGORY: "api/admin/update-category/",

        // Providers

        PROVIDERS: "get-all-salons",
        BLOCK_UNBLOCK_PROVIDER: "api/admin/enable-disable-provider/",
        GET_PROVIDER: "api/admin/provider/",
        VERIFY_BUSINESS_PROVIDER: "api/admin/verify-business/",

        // Amenities
        GET_ALL_AMENITIES: "api/admin/amenities",
        CREATE_AMENITIES: "api/admin/create-amenities",
        UPDATE_AMINITIES: "api/admin/update-amenity/",
        DELETE_AMENITIES: "api/admin/delete-amenities/",

        //safety Rules
        GET_ALL_SAFETY_RULES: "api/admin/safety-rules",
        CREATE_SAFETY_RULES: "api/admin/create-safety-rules",
        UPDATE_SAFETY_RULES: "api/admin/update-safety-rules/",
        DELETE_SAFETY_RULES: "api/admin/delete-safety-rules/",

        GET_ALL_BUSINESS_REPORTS: "api/admin/get-all-business-reports",
        GET_ALL_PROVIDER_FEEDBACK: "api/admin/feedbacks",
        GET_ALL_USERS: "api/admin/users",

        GET_USER_BOOKINGS: "api/admin/user/bookings/",
        GET_PROVIDER_BOOKINGS: "api/admin/provider/bookings/",
        GET_COUNT: "api/admin/count",
        ALL_BOOKINGS: "api/admin/all-bookings",
    };
}
