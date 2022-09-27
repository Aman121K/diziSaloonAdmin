import React, { useRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { confirmPopup } from "primereact/confirmpopup";
import { useHistory, useLocation } from "react-router-dom";
import { logout } from "./services/auth";
import { Menu } from "primereact/menu";

export const AppTopbar = (props) => {
    const history = useHistory();
    const location = useLocation();
    const menu = useRef(null);
    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: "Are you sure you want to Logout?",
            icon: "pi pi-exclamation-triangle",
            accept,
            reject,
        });
    };
    console.log("window::", window.location);
    const accept = () => {
        logout(() => {
            setTimeout(() => {
                history.push("/");
            }, 400);
        });
    };
    const reject = () => {};

    const toggleMenu = (event) => {
        menu.current.toggle(event);
    };
    const navigateToPage = (path) => {
        console.log("Navigate to path " + path);
        history.push(path);
    };
    const overlayMenuItems = [
        {
            label: "Profile",
            icon: "pi pi-fw pi-user",
            command: () => {
                navigateToPage("/profile");
            },
        },
        {
            label: "Change Password",
            icon: "pi pi-fw pi-lock",
            command: () => {
                navigateToPage("change-password");
            },
        },
    ];
    return (
        <div className="layout-topbar">
            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>
            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>
            <Link to="/" className="layout-topbar-logo ml-3">
                <img src={props.layoutColorMode === "light" ? "assets/layout/images/squareLogo.png" : "assets/layout/images/squareLogo.png"} alt="logo" />
                <span>
                    {" "}
                    INSTA<span style={{ color: "#ffdb4d" }}>JAMAICA</span>
                </span>
            </Link>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-calendar" />
                        <span>Events</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={toggleMenu}>
                        <i className="pi pi-cog" />
                        <Menu ref={menu} model={overlayMenuItems} popup />
                        <span>Settings</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={confirm}>
                        <i className="pi pi-power-off" />
                        <span>Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};
