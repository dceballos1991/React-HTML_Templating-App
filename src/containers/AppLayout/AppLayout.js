import React from "react";
import "./appLayout.css";
import Header from "../../components/Header/Header";
import SubBar from "../../components/SubBar/SubBar";
import MainContentContainer from "../MainContentContainer/MainContentContainer";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const AppLayout = (props) => {
  const { children } = props;
  const isWindowSmall = useMediaQuery("(max-width:1200px)");

  return (
    <>
      <Header />
      <div
        style={{
          display: !isWindowSmall ? "flex" : undefined,
          flexWrap: "wrap",
          height: "100%",
          width: "100%",
          alignItems: !isWindowSmall ? "center" : null,
          marginTop: !isWindowSmall ? "-110px" : null,
          overflow: "hidden",
        }}
      >
        <SubBar />
        <MainContentContainer>{children}</MainContentContainer>
      </div>
    </>
  );
};

export default AppLayout;
