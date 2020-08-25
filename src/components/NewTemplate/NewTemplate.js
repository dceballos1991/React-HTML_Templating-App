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
    secondaryHeading: {
        fontSize: "1rem",
        color: "#f44336",
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

export default function NewTemplate() {
    const classes = useStyles();
    const [temporaryNewTemplate, setTemporaryNewTemplate] = React.useState({ id: null, name: null, content: null });
    const [templateProps, setTemplateProps] = React.useState();
    const [showExample, setShowExample] = React.useState(false);

    const {
        selectedCustomerData,
        setNewTemplate,
        setCreateTemplateMode,
        templateList
    } = useAppContext();

    React.useEffect(() => {
        if (!!selectedCustomerData.data) {
            let selectedCustomerDataFixed = { ...selectedCustomerData.data };
            if (!selectedCustomerDataFixed.last_order) {
                selectedCustomerDataFixed.last_order = { products: [{ product_name: "How embarrassing! We don't know your last purchase :(" }] };
            }
            setTemplateProps({ customer: selectedCustomerDataFixed });
        }
    }, [selectedCustomerData])

    const handleNewContentChange = (event) => {
        let templateObj = { ...temporaryNewTemplate }
        templateObj.content = event.target.value
        setTemporaryNewTemplate(templateObj);
    };

    const handleNewNameChange = (event) => {
        let templateObj = { ...temporaryNewTemplate }
        templateObj.name = event.target.value
        templateObj.id = (event.target.value).split(" ").join("") + Math.floor(Math.random() * Math.floor(100)).toString()
        setTemporaryNewTemplate(templateObj);
    };

    const handleSaveTemplateClick = () => {
        setNewTemplate(temporaryNewTemplate);
        setCreateTemplateMode(false);
    }

    const handleCancelEditClick = () => {
        setCreateTemplateMode(false);
        setTemporaryNewTemplate("");
    }

    const handleShowExampleClick = () => {
        setShowExample(!showExample);
    }
    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <Typography align="center" gutterBottom variant="h6" component="h2">
                    New Template
          </Typography>
                <Typography
                    className={classes.title}
                    align="center"
                    color="textSecondary"
                    gutterBottom
                >
                    These are the variables available: <br />
                    <strong>{`{{customer.firstname}}, {{customer.lastname}}, {{customer.email}}`}</strong><br /><br />
                    and to display the list of products from their last order you can type the following:<br />
                    <strong>{`<ul>\n    {% for product in customer.last_order.products %}\n    <li>\n        <strong>{{product.product_name}}</strong><br>\n        {{product.product_desc}}\n    </li>\n    {% endfor %}\n</ul>`}</strong><br /><br />
                </Typography>
                {!!showExample && !!templateList.data && !!templateList.data[0] && !!templateList.data[0].content &&
                    <Typography
                        className={classes.title}
                        align="center"
                        color="textSecondary"
                        gutterBottom
                    >
                        Here is an example: <br />
                        <strong>{`${templateList.data[0].content}`}</strong><br /><br />
                    </Typography>
                }
                {!templateProps && !selectedCustomerData.data &&
                    <Typography className={classes.secondaryHeading} variant="overline">
                        SELECT A customer to see the preview
            </Typography>
                }
                {!!temporaryNewTemplate.content && !!templateProps && !selectedCustomerData.loading && !selectedCustomerData.error &&
                    <Template templateProps={templateProps} templateSource={temporaryNewTemplate.content} />

                }
                <TextField
                    className={classes.editTextArea}
                    id="outlined-text-area"
                    label="Template Name"
                    value={temporaryNewTemplate.name || ""}
                    onChange={(e) => handleNewNameChange(e)}
                    variant="outlined"
                />
                <TextField
                    className={classes.editTextArea}
                    id="outlined-multiline-text-area"
                    label="Edit your Template"
                    multiline
                    rows={8}
                    value={temporaryNewTemplate.content || ""}
                    onChange={(e) => handleNewContentChange(e)}
                    variant="outlined"
                />

            </CardContent>
            <CardActions className={classes.buttonActions} >
                <Button
                    variant="contained"
                    className={classes.buttonMain}
                    onClick={() => handleSaveTemplateClick()}
                    disabled={(!!temporaryNewTemplate.id && !!temporaryNewTemplate.name && !!temporaryNewTemplate.content) ? false : true}
                >
                    save
                </Button>
                <Button
                    variant="outlined"
                    className={classes.buttonSecondary}
                    onClick={() => handleCancelEditClick()}
                >
                    cancel
                </Button>
                {!showExample ? (
                    <Button
                        variant="outlined"
                        className={classes.buttonSecondary}
                        onClick={() => handleShowExampleClick()}
                    >
                        Show Example
                </Button>
                ) : (
                        <Button
                            variant="outlined"
                            className={classes.buttonSecondary}
                            onClick={() => handleShowExampleClick()}
                        >
                            Hide Example
                </Button>
                    )}
            </CardActions>
        </Card>
    );
}
