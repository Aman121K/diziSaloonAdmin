import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

//import * as serviceWorker from './serviceWorker';
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/forgetpassword" exact component={ForgotPassword} />
            <ScrollToTop>
                <App></App>
            </ScrollToTop>
        </Switch>
    </HashRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
