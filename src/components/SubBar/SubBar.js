import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    expanded: {
        '&$expanded': {
            margin: '0'
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function SubBar() {
    const classes = useStyles();
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
            <Accordion expanded={true} className={classes.expanded} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
          </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.expanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
          </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}