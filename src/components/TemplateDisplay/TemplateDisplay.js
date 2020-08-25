import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Template from "../Template/Template";
import { useAppContext } from "../../providers/AppProvider";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  buttonMain: {
    background:
      "linear-gradient(90deg, rgba(216,39,108,1) 22%, rgba(240,137,177,1) 100%)",
    color: "white",
    margin: "0 1rem 1rem 1rem"
  },
  buttonSecondary: {
    margin: "0 1rem 1rem 1rem"
  },
  buttonActions: {
    justifyContent: "center"
  }
});

export default function TemplateDisplay() {
  const classes = useStyles();
  const {
    selectedCustomerData,
    selectedTemplateData,
    createTemplateMode,
  } = useAppContext();

  const [templateProps, setTemplateProps] = React.useState();

  // in order to accound for missing data for last_order I did the following: 
  React.useEffect(() => {
    if (!!selectedCustomerData.data) {
      let selectedCustomerDataFixed = { ...selectedCustomerData.data };
      if (!selectedCustomerDataFixed.last_order) {
        selectedCustomerDataFixed.last_order = { products: [{ product_name: "How embarrassing! We don't know your last purchase :(" }] };
      }
      setTemplateProps({ customer: selectedCustomerDataFixed });
    }
  }, [selectedCustomerData])

  return (
    <Card className={classes.root}>
      <CardContent>
        {(!selectedCustomerData.data || !selectedTemplateData.data) &&
          !createTemplateMode ? (
            <Typography align="center" gutterBottom variant="h6" component="h2">
              Select a customer and a template to display
          </Typography>
          ) : (
            <>
              <Typography
                className={classes.title}
                align="center"
                color="textSecondary"
                gutterBottom
              >
                <strong>{selectedTemplateData.data.name}</strong> for{" "}
                <strong>
                  {(selectedCustomerData.data.firstname || "") +
                    " " +
                    (selectedCustomerData.data.lastname || "")}
                </strong>
              </Typography>
              {!!templateProps && !selectedCustomerData.loading && !selectedCustomerData.error &&
                !!selectedTemplateData.data && !selectedTemplateData.loading && !selectedTemplateData.error &&
                <Template templateProps={templateProps} templateSource={selectedTemplateData.data.content} />
              }
            </>
          )}
      </CardContent>
      {!!selectedCustomerData.data && !!selectedTemplateData.data && (
        <CardActions className={classes.buttonActions} >
          <Button
            variant="contained"
            className={classes.buttonMain}
          // onClick={() => handleCreateTemplateClick}
          >
            edit template
                </Button>
          <Button
            variant="outlined"
            className={classes.buttonSecondary}
          // onClick={() => handleCreateTemplateClick}
          >
            Delete
                </Button>
        </CardActions>
      )}
    </Card>
  );
}
