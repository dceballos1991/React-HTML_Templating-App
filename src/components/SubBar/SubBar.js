import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useAppContext } from "../../providers/AppProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexBasis: "33.33%",
    flexShrink: 0,
    // flexGrow: 1,
    padding: "0 2rem",
    boxSizing: "border-box",
    ["@media (max-width:1200px)"]: { flexBasis: "100%" },
  },
  expanded: {
    "&$expanded": {
      margin: "0",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: "#f44336",
    marginTop: "-.25rem",
  },
  formControl: {
    margin: theme.spacing(0),
    width: "100%",
    minWidth: 200,
    maxWidth: 400,
  },
  form: {
    margin: theme.spacing(1),
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    background:
      "linear-gradient(90deg, rgba(216,39,108,1) 22%, rgba(240,137,177,1) 100%)",
    color: "white",
    marginBottom: "1rem",
  },
  customerInfo: {
    padding: ".5rem 0",
  },
}));

export default function SubBar() {
  const classes = useStyles();
  const {
    selectedCustomerData,
    selectedTemplateData,
    customerSearchByEmailData,
    customerList,
    templateList,
    selectedCustomerID,
    setSelectedCustomerID,
    selectedTemplateID,
    setSelectedTemplateID,
    partialEmail,
    setPartialEmail,
    setFullEmail,
    setCreateTemplateMode,
    createTemplateMode,
  } = useAppContext();

  console.log("emaildata", customerSearchByEmailData);
  const [isPanel1Open, setIsPanel1Open] = React.useState(
    !useMediaQuery("(max-width:1200px)")
  );
  const [isPanel2Open, setIsPanel2Open] = React.useState(
    !useMediaQuery("(max-width:1200px)")
  );
  const [displayCustomerInfo, setDisplayCustomerInfo] = React.useState(false);
  const isWindowSmall = useMediaQuery("(max-width:1200px)");

  React.useEffect(() => {
    setIsPanel1Open(!isWindowSmall);
    setIsPanel2Open(!isWindowSmall);
  }, [isWindowSmall]);

  const handleSelectCustomerChange = (id) => {
    setSelectedCustomerID(id);
    setPartialEmail("");
    if (!!id) {
      setDisplayCustomerInfo(true);
    } else {
      setDisplayCustomerInfo(false);
    }
  };

  const handleSelectTemplateChange = (id) => {
    setSelectedTemplateID(id);
  };

  const handleSearchByEmailChange = (event) => {
    if (event.target.value) {
      setPartialEmail(event.target.value);
    } else {
      setPartialEmail("");
    }
  };

  const handleSearchByEmailSubmit = (event) => {
    event.preventDefault();
    if (!!partialEmail) {
      setFullEmail(partialEmail);
    }
  };

  const handleCreateTemplateClick = () => {
    setCreateTemplateMode(true);
  };

  const handleOpenAccordion = (panel) => {
    if (panel === 1) {
      setIsPanel1Open(!isPanel1Open);
    } else {
      setIsPanel2Open(!isPanel2Open);
    }
  };

  return (
    <div
      className={classes.root}
      style={{ marginBottom: isWindowSmall ? "2rem" : undefined }}
    >
      <Accordion
        className={classes.expanded}
        expanded={isWindowSmall ? isPanel1Open : true}
        onClick={() => handleOpenAccordion(1)}
      >
        <AccordionSummary
          expandIcon={isWindowSmall ? <ExpandMoreIcon /> : null}
          aria-controls="panel-1-content"
          id="panel-1-header"
        >
          <Typography className={classes.heading}>Customers</Typography>
          {!selectedCustomerData.data && (
            <Typography className={classes.secondaryHeading} variant="overline">
              SELECT A CUSTOMER
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              padding: "0 4rem",
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            {!!displayCustomerInfo && !!selectedCustomerData.data ? (
              <>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={() => handleSelectCustomerChange("")}>
                    <ArrowBackIcon />
                  </IconButton>
                </div>
                <Typography className={classes.customerInfo}>{`Name: ${
                  (selectedCustomerData.data.firstname || "") +
                  " " +
                  (selectedCustomerData.data.lastname || "")
                }`}</Typography>
                <Typography
                  className={classes.customerInfo}
                >{`Email: ${selectedCustomerData.data.email}`}</Typography>
                <Typography className={classes.customerInfo}>{`Last Updated: ${
                  !!selectedCustomerData.data.last_order
                    ? selectedCustomerData.data.last_order.timestamp
                    : "-"
                }`}</Typography>
              </>
            ) : (
              <>
                <Typography>Select a Customer:</Typography>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <form className={classes.form}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="customer-select-outlined-label">
                        Customer List
                      </InputLabel>
                      <Select
                        labelId="customer-select-outlined-label"
                        id="customer-select-outlined"
                        value={selectedCustomerID}
                        onChange={(event) =>
                          handleSelectCustomerChange(event.target.value)
                        }
                        label="Customer List"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {!!customerList.data &&
                          customerList.data.map((customer) => {
                            return (
                              <MenuItem value={customer.id} key={customer.id}>
                                {(customer.firstname || "") +
                                  " " +
                                  (customer.lastname || "")}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </form>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="overline">or</Typography>
                </div>
                <Typography>Search by Email:</Typography>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <form
                    onSubmit={(e) => handleSearchByEmailSubmit(e)}
                    className={classes.form}
                  >
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <TextField
                        id="customer-search-input"
                        label="Customer List"
                        variant="outlined"
                        style={{ position: "relative" }}
                        value={partialEmail}
                        onChange={(e) => handleSearchByEmailChange(e)}
                      />
                      {!!customerSearchByEmailData.data &&
                        !!customerSearchByEmailData.data.length && (
                          <div
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "200px",
                              background: "white",
                              zIndex: 2,
                              top: "53px",
                              borderBottomLeftRadius: "4px",
                              borderBottomRightRadius: "4px",
                              borderBottom: "1px solid rgba(0,0,0,.20)",
                              borderLeft: "1px solid rgba(0,0,0,.20)",
                              borderRight: "1px solid rgba(0,0,0,.20)",
                              boxSizing: "border-box",
                              overflowY: "scroll",
                            }}
                          >
                            <List>
                              {customerSearchByEmailData.data.map(
                                (customer) => {
                                  return (
                                    <ListItem
                                      key={customer.id}
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleSelectCustomerChange(customer.id)
                                      }
                                    >
                                      <ListItemText
                                        primary={
                                          (customer.firstname || "") +
                                          " " +
                                          (customer.lastname || "")
                                        }
                                        secondary={customer.email}
                                      />
                                    </ListItem>
                                  );
                                }
                              )}
                            </List>
                          </div>
                        )}
                    </FormControl>
                  </form>
                </div>
              </>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.expanded}
        expanded={isWindowSmall ? isPanel2Open : true}
        onClick={() => handleOpenAccordion(2)}
      >
        <AccordionSummary
          expandIcon={isWindowSmall ? <ExpandMoreIcon /> : null}
          aria-controls="panel-2-content"
          id="panel-2-header"
        >
          <Typography className={classes.heading}>Templates</Typography>
          {!selectedTemplateData.data && !createTemplateMode && (
            <Typography className={classes.secondaryHeading} variant="overline">
              SELECT A template
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              padding: "0 4rem",
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Typography>Select a Template:</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <form className={classes.form}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="template-select-outlined-label">
                    Template List
                  </InputLabel>
                  <Select
                    labelId="template-select-outlined-label"
                    id="template-select-outlined"
                    value={selectedTemplateID}
                    onChange={(event) =>
                      handleSelectTemplateChange(event.target.value)
                    }
                    label="Template List"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {!!templateList.data &&
                      templateList.data.map((template) => {
                        return (
                          <MenuItem value={template.id} key={template.id}>
                            {template.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </form>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="overline">or</Typography>
            </div>
            <Typography>Create a New Template:</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <form className={classes.form}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => handleCreateTemplateClick}
                >
                  new template
                </Button>
              </form>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
