import Dashboard from "../components/Dashboard";
import FormLayoutDemo from "../components/FormLayoutDemo";
import Categories from "../components/Categories";
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
        path: "/formlayout",
        name: "FormLayout",
        component: FormLayoutDemo,
    },
];
