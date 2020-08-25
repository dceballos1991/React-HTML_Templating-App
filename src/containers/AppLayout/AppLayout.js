import React from "react";
import "./appLayout.css";
import Header from "../../components/Header/Header";
import SubBar from "../../components/SubBar/SubBar";


const AppLayout = (props) => {
    const { children } = props;

    return (
        <>
            <Header />
            <div style={{ display: "flex", height: "100%", width: "100%", alignItems: "center", marginTop: "-110px", overflow: "hidden" }}>
                <SubBar />
                {/* <MainContent className="main-content">
                    {children}
                </MainContent> */}
            </div>
        </>
    )
}

export default AppLayout