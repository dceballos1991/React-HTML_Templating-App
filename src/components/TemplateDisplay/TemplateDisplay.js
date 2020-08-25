import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
});

export default function TemplateDisplay() {
  const classes = useStyles();
  const {
    selectedCustomerData,
    selectedTemplateData,
    createTemplateMode,
  } = useAppContext();

  const bull = <span className={classes.bullet}>•</span>;

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
            <Typography variant="h5" component="h2">
              be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              adjective
            </Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </>
        )}
      </CardContent>
      {!!selectedCustomerData.data && !!selectedTemplateData.data && (
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      )}
    </Card>
  );
}
