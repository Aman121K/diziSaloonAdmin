import Dashboard from "../components/Dashboard";
import FormLayoutDemo from "../components/FormLayoutDemo";
import Categories from "../components/Categories";
import Users from "../components/Users";
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
        path: "/users",
        name: "Users",
        component: Users,
    },

    {
        path: "/formlayout",
        name: "FormLayout",
        component: FormLayoutDemo,
    },
];
