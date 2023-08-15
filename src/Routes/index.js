import React from "react";
import { PrivateRoutes } from "./routes";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
export default function ProtectedRoute() {
    console.log("Auth is>>")
    const getAuthRoutes = (routes) => {
        return routes.map((prop, key) => {
            return  <Route path={prop.path} key={prop.path} component={prop.component} />;
        });
    };

    return <div>{getAuthRoutes(PrivateRoutes)}</div>;
}

// export function ProtectedRoutes({ isAuth: isAuth, component: Component, ...rest }) {
//     return (
//         <Route
//             {...rest}
//             render={(props) => {
//                 if (isAuth) {
//                     return <Component />;
//                 } else {
//                     return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
//                 }
//             }}
//         />
//     );
// }
