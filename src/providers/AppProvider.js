import React from "react";
import {
  fetchTemplates,
  fetchTemplatesByID,
  saveNewTemplate,
  updateTemplate,
  fetchCustomers,
  fetchCustomerByID,
  fetchCustomersByEmail,
  fetchCustomersByPartialEmail,
  deleteTemplate
} from "../utils/APIUtils";
// import { create } from "json-server";

// In a more complex application I would use Redux as opposed to context. However, I do want to show how
// I am using redux patterns and best practices even without using redux itself.
// Also, in a larger application I would rather make smaller providers that are more specific to the components
// that make use of them, as opposed to put everything on the global App Provider

const AppContext = React.createContext();

function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  return context;
}

const initialState = {
  TEMPLATE_LIST: {
    data: null,
    error: false,
    loading: false,
    lastUpdated: null,
  },
  CUSTOMER_LIST: {
    data: null,
    error: false,
    loading: false,
    lastUpdated: null,
  },
  SELECTED_TEMPLATE: {
    data: null,
    error: false,
    loading: false,
    lastUpdated: null,
  },
  SELECTED_CUSTOMER: {
    data: null,
    error: false,
    loading: false,
    lastUpdated: null,
  },
  CUSTOMER_BY_EMAIL: {
    data: null,
    error: false,
    loading: false,
    lastUpdated: null,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_TEMPLATE_LIST":
      return {
        ...state,
        ...{
          TEMPLATE_LIST: {
            ...state.TEMPLATE_LIST,
            ...action.payload,
          },
        },
      };
    case "FETCH_CUSTOMER_LIST":
      return {
        ...state,
        ...{
          CUSTOMER_LIST: {
            ...state.CUSTOMER_LIST,
            ...action.payload,
          },
        },
      };
    case "FETCH_SELECTED_TEMPLATE":
      return {
        ...state,
        ...{
          SELECTED_TEMPLATE: {
            ...state.SELECTED_TEMPLATE,
            ...action.payload,
          },
        },
      };
    case "FETCH_SELECTED_CUSTOMER":
      return {
        ...state,
        ...{
          SELECTED_CUSTOMER: {
            ...state.SELECTED_CUSTOMER,
            ...action.payload,
          },
        },
      };
    case "FETCH_CUSTOMER_BY_EMAIL":
      return {
        ...state,
        ...{
          CUSTOMER_BY_EMAIL: {
            ...state.CUSTOMER_BY_EMAIL,
            ...action.payload,
          },
        },
      };

    default:
      return state;
  }
}

const AppProvider = function (props) {
  const { children } = props;
  const [store, dispatch] = React.useReducer(reducer, initialState);
  const [selectedCustomerID, setSelectedCustomerID] = React.useState("");
  const [selectedTemplateID, setSelectedTemplateID] = React.useState("");
  const [updatedTemplate, setUpdatedTemplate] = React.useState({});
  const [newTemplate, setNewTemplate] = React.useState({});

  // Create template mode is activated on the subBar and it tells the MainContent that
  // app is in new template mode.
  const [deleteTemplateID, setDeleteTemplateID] = React.useState();
  const [createTemplateMode, setCreateTemplateMode] = React.useState(false);
  const [partialEmail, setPartialEmail] = React.useState("");
  const [fullEmail, setFullEmail] = React.useState("");
  const [refresh, setRefresh] = React.useState(true);

  // action creators:
  function actionLoading(actionType, state) {
    const action = {
      type: actionType,
      payload: {
        loading: state,
      },
    };

    dispatch(action);
  }

  function actionError(actionType, state) {
    const action = {
      type: actionType,
      payload: {
        error: state,
      },
    };

    dispatch(action);
  }

  function actionUpdateData(actionType, data) {
    const action = {
      type: actionType,
      payload: {
        data,
        lastUpdated: new Date().getTime(),
      },
    };
    dispatch(action);
  }

  // fetch complete list of customers and templates on mount or when refresh is triggered
  React.useEffect(() => {
    const getTemplateList = () => {
      actionLoading("FETCH_TEMPLATE_LIST", true);
      actionError("FETCH_TEMPLATE_LIST", false);
      return fetchTemplates()
        .then((response) => {
          actionUpdateData("FETCH_TEMPLATE_LIST", response);
          actionLoading("FETCH_TEMPLATE_LIST", false);
        })
        .catch(() => {
          actionError("FETCH_TEMPLATE_LIST", true);
          actionLoading("FETCH_TEMPLATE_LIST", false);
        });
    };

    const getCustomerList = () => {
      actionLoading("FETCH_CUSTOMER_LIST", true);
      actionError("FETCH_CUSTOMER_LIST", false);
      return fetchCustomers()
        .then((response) => {
          actionUpdateData("FETCH_CUSTOMER_LIST", response);
          actionLoading("FETCH_CUSTOMER_LIST", false);
        })
        .catch(() => {
          actionError("FETCH_CUSTOMER_LIST", true);
          actionLoading("FETCH_CUSTOMER_LIST", false);
        });
    };

    if (!!refresh) {
      getCustomerList();
      getTemplateList();
      setRefresh(false);
    }
  }, [refresh]);

  // fetch customers by email
  React.useEffect(() => {
    const getCustomerByEmail = (email) => {
      actionLoading("FETCH_CUSTOMER_BY_EMAIL", true);
      actionError("FETCH_CUSTOMER_BY_EMAIL", false);
      return fetchCustomersByEmail(email)
        .then((response) => {
          actionUpdateData("FETCH_CUSTOMER_BY_EMAIL", response);
          actionLoading("FETCH_CUSTOMER_BY_EMAIL", false);
        })
        .catch(() => {
          actionError("FETCH_CUSTOMER_BY_EMAIL", true);
          actionLoading("FETCH_CUSTOMER_BY_EMAIL", false);
        });
    };
    if (!!fullEmail) {
      getCustomerByEmail(fullEmail);
    }
  }, [fullEmail]);

  //fetch customers by partial email
  React.useEffect(() => {
    const getCustomerByPartialEmail = (email) => {
      actionLoading("FETCH_CUSTOMER_BY_EMAIL", true);
      actionError("FETCH_CUSTOMER_BY_EMAIL", false);
      return fetchCustomersByPartialEmail(email)
        .then((response) => {
          actionUpdateData("FETCH_CUSTOMER_BY_EMAIL", response);
          actionLoading("FETCH_CUSTOMER_BY_EMAIL", false);
        })
        .catch(() => {
          actionError("FETCH_CUSTOMER_BY_EMAIL", true);
          actionLoading("FETCH_CUSTOMER_BY_EMAIL", false);
        });
    };
    if (!!partialEmail) {
      getCustomerByPartialEmail(partialEmail);
    } else {
      actionUpdateData("FETCH_CUSTOMER_BY_EMAIL", null);
    }
  }, [partialEmail]);

  // Eventhough you dont need to call the api for a specific customer or template
  // since when you fetch the list you get all the info, in a larger application
  // this wouldnt be the case
  React.useEffect(() => {
    const getSelectedTemplate = (id) => {
      actionLoading("FETCH_SELECTED_TEMPLATE", true);
      actionError("FETCH_SELECTED_TEMPLATE", false);
      return fetchTemplatesByID(id)
        .then((response) => {
          actionUpdateData("FETCH_SELECTED_TEMPLATE", response);
          actionLoading("FETCH_SELECTED_TEMPLATE", false);
        })
        .catch(() => {
          actionError("FETCH_SELECTED_TEMPLATE", true);
          actionLoading("FETCH_SELECTED_TEMPLATE", false);
        });
    };

    if (selectedTemplateID) {
      getSelectedTemplate(selectedTemplateID);
    } else {
      actionUpdateData("FETCH_SELECTED_TEMPLATE", null);
    }
  }, [selectedTemplateID, refresh]);

  React.useEffect(() => {
    const getSelectedCustomer = (id) => {
      actionLoading("FETCH_SELECTED_CUSTOMER", true);
      actionError("FETCH_SELECTED_CUSTOMER", false);
      return fetchCustomerByID(id)
        .then((response) => {
          actionUpdateData("FETCH_SELECTED_CUSTOMER", response);
          actionLoading("FETCH_SELECTED_CUSTOMER", false);
        })
        .catch(() => {
          actionError("FETCH_SELECTED_CUSTOMER", true);
          actionLoading("FETCH_SELECTED_CUSTOMER", false);
        });
    };

    if (!!selectedCustomerID) {
      getSelectedCustomer(selectedCustomerID);
    } else {
      actionUpdateData("FETCH_SELECTED_CUSTOMER", null);
    }
  }, [selectedCustomerID, refresh]);

  React.useEffect(() => {
    const putUpdatedTemplate = async (id, data) => {
      try {
        const response = await updateTemplate(id, data); // use this response to trigger a snackbar that communicates success to the user
        setRefresh(true); // will trigger a refresh of the updated template
      } catch (e) {
        console.log("There was an error when updating template"); // Use this catch to trigger error snackbar
      }
    };

    if (!!Object.keys(updatedTemplate).length) {
      putUpdatedTemplate(selectedTemplateID, updatedTemplate);
    }
  }, [updatedTemplate]);

  React.useEffect(() => {
    const deleteTemplateByID = async (id) => {
      try {
        const response = await deleteTemplate(id); // use response to trigger success snackbar
        setRefresh(true); // refresh template list
      } catch (e) {
        console.log("There was an error when creating new template"); // Use this catch to trigger error snackbar
      }
    };

    if (!!deleteTemplateID) {
      deleteTemplateByID(deleteTemplateID);
    }
  }, [deleteTemplateID]);

  React.useEffect(() => {
    const postNewTemplate = async (body) => {
      try {
        const response = await saveNewTemplate(body); // use response to trigger success snackbar
        setSelectedTemplateID(newTemplate.id); // refresh selected template
        setNewTemplate(null);
        setRefresh(true); // refresh template list
      } catch (e) {
        console.log("There was an error when creating new template"); // Use this catch to trigger error snackbar
      }
    };

    if (!!newTemplate && !!newTemplate.id && !!newTemplate.name && !!newTemplate.content) {
      postNewTemplate(newTemplate);
    }
  }, [newTemplate]);

  return (
    <AppContext.Provider
      value={{
        selectedCustomerData: store.SELECTED_CUSTOMER,
        selectedTemplateData: store.SELECTED_TEMPLATE,
        customerSearchByEmailData: store.CUSTOMER_BY_EMAIL,
        customerList: store.CUSTOMER_LIST,
        templateList: store.TEMPLATE_LIST,
        setNewTemplate,
        selectedCustomerID,
        setSelectedCustomerID,
        selectedTemplateID,
        setSelectedTemplateID,
        setUpdatedTemplate,
        updatedTemplate,
        setRefresh,
        partialEmail,
        setPartialEmail,
        setFullEmail,
        createTemplateMode,
        setCreateTemplateMode,
        setDeleteTemplateID,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export { useAppContext };
