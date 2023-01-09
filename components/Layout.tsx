import React from "react";
import Header from "./Header";

const Layout = (props: any) => {
    return (
        <div> 
            <Header />
            {props.children}
            <h1>
                FOOTER
            </h1>
        </div>
    )
};

export default Layout;