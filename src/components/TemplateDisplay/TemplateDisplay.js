import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Template from "../Template/Template";
import TextField from '@material-ui/core/TextField';
import { useAppContext } from "../../providers/AppProvider";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: "100%",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  title: {
    fontSize: 14,
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
  },
  editTextArea: {
    width: "80%",
    marginBottom: "1rem"
  }
});

// With more time I would add a modal that confirms that the user wants to edit or delete a template
export default function TemplateDisplay() {
  const classes = useStyles();
  const {
    selectedCustomerData,
    selectedTemplateData,
    createTemplateMode,
    updatedTemplate,
    setUpdatedTemplate,
  } = useAppContext();

  const [templateProps, setTemplateProps] = React.useState();
  const [templateEditMode, setTemplateEditMode] = React.useState(false);
  const [temporaryEditTemplate, setTemporaryEditTemplate] = React.useState("");

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

  React.useEffect(() => {
    if (!!templateEditMode && !!selectedTemplateData.data) {
      setTemporaryEditTemplate(selectedTemplateData.data);
    }
  }, [selectedTemplateData, templateEditMode])

  React.useEffect(() => {
    setTemplateEditMode(false);
  }, [selectedCustomerData, selectedTemplateData])

  const handleEditContentChange = (event) => {
    let templateObj = { ...temporaryEditTemplate }
    templateObj.content = event.target.value
    setTemporaryEditTemplate(templateObj);
  };

  const handleEditNameChange = (event) => {
    let templateObj = { ...temporaryEditTemplate }
    templateObj.name = event.target.value
    setTemporaryEditTemplate(templateObj);
  };

  const handleEditTemplateClick = () => {
    setTemplateEditMode(true);
  };

  const handleSaveTemplateClick = () => {
    setUpdatedTemplate(temporaryEditTemplate);
  }
  console.log(temporaryEditTemplate)
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
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
              {!!templateEditMode &&
                <>
                  <TextField
                    className={classes.editTextArea}
                    id="outlined-text-area"
                    label="Template Name"
                    value={temporaryEditTemplate.name || ""}
                    onChange={(e) => handleEditNameChange(e)}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.editTextArea}
                    id="outlined-multiline-text-area"
                    label="Edit your Template"
                    multiline
                    rows={8}
                    value={temporaryEditTemplate.content || ""}
                    onChange={(e) => handleEditContentChange(e)}
                    variant="outlined"
                  />
                </>
              }
            </>
          )}
      </CardContent>
      {!!selectedCustomerData.data && !!selectedTemplateData.data && (
        <>
          {!!templateEditMode ? (
            <CardActions className={classes.buttonActions} >
              <Button
                variant="contained"
                className={classes.buttonMain}
                onClick={() => handleSaveTemplateClick()}
              >
                save
                </Button>
              <Button
                variant="outlined"
                className={classes.buttonSecondary}
              // onClick={() => handleCancelEditClick()}
              >
                cancel
                </Button>
            </CardActions>
          ) : (
              <CardActions className={classes.buttonActions} >
                <Button
                  variant="contained"
                  className={classes.buttonMain}
                  onClick={() => handleEditTemplateClick()}
                >
                  edit template
                </Button>
                <Button
                  variant="outlined"
                  className={classes.buttonSecondary}
                // onClick={() => handleDeleteTemplateClick}
                >
                  Delete
                </Button>
              </CardActions>
            )}
        </>
      )}
    </Card>
  );
}
