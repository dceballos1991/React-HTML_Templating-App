import React from "react";
import "./appLayout.css";
import Header from "../../components/Header/Header";
import SubBar from "../../components/SubBar/SubBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const AppLayout = (props) => {
  const { children } = props;
  const isWindowSmall = useMediaQuery("(max-width:1200px)");

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: !isWindowSmall ? "center" : null,
          marginTop: !isWindowSmall ? "-110px" : null,
          overflow: "hidden",
        }}
      >
        <SubBar />
        {/* <MainContent className="main-content">
                    {children}
                </MainContent> */}
      </div>
    </>
  );
};

export default AppLayout;
