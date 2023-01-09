import React from "react";

const Layout = (props: any) => {
    return (
        <div> 
            <h1>
                HEADER
            </h1>
            {props.children}
            <h1>
                FOOTER
            </h1>
        </div>
    )
};

export default Layout;