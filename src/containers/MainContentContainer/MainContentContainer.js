import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TemplateDisplay from "../../components/TemplateDisplay/TemplateDisplay";
import NewTemplate from "../../components/NewTemplate/NewTemplate";
import { useAppContext } from "../../providers/AppProvider";


const useStyles = makeStyles((theme) => ({
  root: {
    flexBasis: "66.66%",
    flexShrink: 0,
    // flexGrow: 2,
    padding: "0 2rem",
    boxSizing: "border-box",
    ["@media (max-width:1200px)"]: { flexBasis: "100%" },
  },
}));

export default function MainContentContainer() {
  const classes = useStyles();
  const {
    createTemplateMode
  } = useAppContext();

  return (
    <div className={classes.root}>
      {!!createTemplateMode ? (
        <NewTemplate />
      ) : (
          <TemplateDisplay />
        )}
    </div>
  );
}
