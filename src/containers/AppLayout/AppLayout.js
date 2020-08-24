import React from "react";
import "./appLayout.css";
import Header from "../../components/Header/Header";


const AppLayout = (props) => {
    const { children } = props;

    return (
        <>
            <Header />
            <div>
                <SubBar className="sub-bar" />
                <MainContent className="main-content">
                    {children}
                </MainContent>
            </div>
        </>
    )
}

export default AppLayout