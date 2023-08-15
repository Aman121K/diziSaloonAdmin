import Dashboard from "../components/Dashboard";
import FormLayoutDemo from "../components/FormLayoutDemo";
import Categories from "../components/Categories";
import Users from "../components/Users";
import Providers from "../components/Providers";
import Profile from "../pages/Profile";
import ProviderInfo from "../pages/ProviderInfo";
import Amenities from "../components/Amenities";
import SafetyRules from "../components/SafetyRules";
import Reports from "../components/Reports";
import Feedback from "../components/Feedback";
import UserView from "../components/UserView";
import BookingDetails from "../pages/BookingDetails";
import Articals from "../components/Articals";
import Ads from "../components/Ads";
import Styles from "../components/Styles";

export const PrivateRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/categories",
        name: "Categories",
        component: Categories,
    },
    {
        path: "/articals",
        name: "articals",
        component: Articals,
    },
    {
        path: "/ads",
        name: "ads",
        component: Ads,
    },
    {
        path: "/styles",
        name: "styles",
        component: Styles,
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
    },
    {
        path: "/providers",
        name: "Providers",
        component: Providers,
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
    },
    {
        path: "/providerInfo/:id",
        name: "ProviderInfo",
        component: ProviderInfo,
    },

    {
        path: "/formlayout",
        name: "FormLayout",
        component: FormLayoutDemo,
    },
    {
        path: "/amenities",
        name: "Amenities",
        component: Amenities,
    },
    {
        path: "/safety-rules",
        name: "SafetyRules",
        component: SafetyRules,
    },
    {
        path: "/reports",
        name: "Reports",
        component: Reports,
    },
    {
        path: "/feedback",
        name: "FeedBack",
        component: Feedback,
    },
    {
        path: "/user-view/:id",
        name: "UserView",
        component: UserView,
    },
    {
        path: "/bookingDetail/:id",
        name: "BookingDetail",
        component: BookingDetails,
    },
];
