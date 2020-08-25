import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexBasis: "66.66%",
    flexShrink: 0,
    padding: "0 2rem",
    boxSizing: "border-box",
    ["@media (max-width:1200px)"]: { flexBasis: "100%" },
  },
}));

export default function MainContentContainer(props) {
  const classes = useStyles();
  const { children } = props;

  return <div className={classes.root}>{children}</div>;
}
