import React from "react";
// import Handlebars from "handlebars";
// import Liquid from "liquid";
import { ReactLiquid } from 'react-liquid'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        padding: "1.5rem",
    },
    templateCard: {
        borderRadius: "4px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        padding: "1rem"
    }
});

export default function Template(props) {
    const classes = useStyles();
    const { templateSource, templateProps } = props

    return (
        <div className={classes.root}>
            <ReactLiquid template={templateSource} data={templateProps} render={(renderTemplate) => {
                return <span className={classes.templateCard} dangerouslySetInnerHTML={renderTemplate} />
            }} />
        </div>

    )
};