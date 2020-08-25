import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAppContext } from "../../providers/AppProvider";

const useStyles = makeStyles((theme) => ({
    root: {
        flexBasis: "33.33%",
        flexShrink: 0,
        padding: "0 2rem",
        ["@media (max-width:1200px)"]:
            { flexBasis: "100%" }
    },
    expanded: {
        '&$expanded': {
            margin: '0'
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: "#f44336",
        marginTop: "-.25rem"
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
        minWidth: 200,
        maxWidth: 400
    },
    button: {
        background: "linear-gradient(90deg, rgba(216,39,108,1) 22%, rgba(240,137,177,1) 100%)",
        color: "white",
        marginBottom: "1rem",
    }
}));

export default function SubBar() {
    const classes = useStyles();
    const { selectedCustomerData,
        selectedTemplateData,
        customerSearchByEmailData,
        customerList, templateList,
        setSelectedCustomerID,
        setSelectedTemplateID,
        setPartialEmail, setFullEmail,
        setCreateTemplateMode,
    } = useAppContext();

    const [isPanel1Open, setIsPanel1Open] = React.useState(!useMediaQuery('(max-width:1200px)'));
    const [isPanel2Open, setIsPanel2Open] = React.useState(!useMediaQuery('(max-width:1200px)'));
    const isWindowSmall = useMediaQuery('(max-width:1200px)')

    React.useEffect(() => {
        setIsPanel1Open(!isWindowSmall)
        setIsPanel2Open(!isWindowSmall)
    }, [isWindowSmall])

    const handleClick = (panel) => {
        if (panel === 1) {
            setIsPanel1Open(!isPanel1Open)
        } else {
            setIsPanel2Open(!isPanel2Open)
        }
    }

    return (
        <div className={classes.root}>
            <Accordion className={classes.expanded} expanded={isWindowSmall ? isPanel1Open : true}>
                <AccordionSummary
                    expandIcon={isWindowSmall ? <ExpandMoreIcon /> : null}
                    aria-controls="panel-1-content"
                    id="panel-1-header"
                >
                    <Typography className={classes.heading}>Customers</Typography>
                    {
                        !selectedCustomerData.data && (
                            <Typography className={classes.secondaryHeading} variant="overline">
                                SELECT A CUSTOMER
                                </Typography>
                        )
                    }

                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ padding: "0 4rem", display: "flex", width: '100%', flexDirection: "column" }}>
                        <Typography>
                            Select a Customer:
          </Typography>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={""}
                                    onChange={() => (console.log(""))}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <Typography variant="overline">
                                or
          </Typography>
                        </div>
                        <Typography>
                            Search by Email:
          </Typography>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            </FormControl>
                        </div>
                    </div>

                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.expanded}>
                <AccordionSummary
                    expandIcon={isWindowSmall ? <ExpandMoreIcon /> : null}
                    aria-controls="panel-2-content"
                    id="panel-2-header"
                >
                    <Typography className={classes.heading}>Templates</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ padding: "0 4rem", display: "flex", width: '100%', flexDirection: "column" }}>
                        <Typography>
                            Select a Template:
          </Typography>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={""}
                                    onChange={() => (console.log(""))}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <Typography variant="overline">
                                or
          </Typography>
                        </div>
                        <Typography>
                            Create a New Template:
          </Typography>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <Button variant="contained" className={classes.button}>new template</Button>
                        </div>
                    </div>

                </AccordionDetails>
            </Accordion>

        </div>
    );
}