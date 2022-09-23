import React from "react";

export const AppFooter = (props) => {
    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === "light" ? "assets/layout/images/squareLogo.png" : "assets/layout/images/squareLogo.png"} alt="Logo" height="20" className="mr-2" />

            <span className="font-medium">Instajamaica</span>
        </div>
    );
};
