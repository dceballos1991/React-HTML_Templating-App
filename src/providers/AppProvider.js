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
} from "../utils/APIUtils";
import { create } from "json-server";

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
  COSTUMER_LIST: {
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
  SELECTED_COSTUMER: {
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
    default:
      return state;
  }
}

const AppProvider = function (props) {
  const { children } = props;
  const [store, dispatch] = React.useReducer(reducer, initialState);
  const [selectedCostumerID, setSelectedCostumerID] = React.useState();
  const [selectedTemplateID, setSelectedTemplateID] = React.useState();
  const [updateTemplate, setUpdateTemplate] = React.useState(false);
  const [createNewTemplate, setCreateNewTemplate] = React.useState(false);

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

    const getCostumerList = () => {
      actionLoading("FETCH_CUSTOMER_LIST", true);
      actionError("FETCH_CUSTOMER_LIST", false);
      return fetchTemplates()
        .then((response) => {
          actionUpdateData("FETCH_CUSTOMER_LIST", response);
          actionLoading("FETCH_CUSTOMER_LIST", false);
        })
        .catch(() => {
          actionError("FETCH_CUSTOMER_LIST", true);
          actionLoading("FETCH_CUSTOMER_LIST", false);
        });
    };

    getCostumerList();
    getTemplateList();
  }, []);

  // Eventhough you dont need to call the api for a specific costumer or template
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

    if (selectedTemplateID && !createNewTemplate) {
      getSelectedTemplate(selectedTemplateID);
    }
  }, [selectedTemplateID, createNewTemplate]);

  React.useEffect(() => {
    const getSelectedCostumer = (id) => {
      actionLoading("FETCH_SELECTED_COSTUMER", true);
      actionError("FETCH_SELECTED_COSTUMER", false);
      return fetchCustomerByID(id)
        .then((response) => {
          actionUpdateData("FETCH_SELECTED_COSTUMER", response);
          actionLoading("FETCH_SELECTED_COSTUMER", false);
        })
        .catch(() => {
          actionError("FETCH_SELECTED_COSTUMER", true);
          actionLoading("FETCH_SELECTED_COSTUMER", false);
        });
    };

    if (!!selectedCostumerID && !createNewTemplate) {
      getSelectedCostumer(selectedCostumerID);
    }
  }, [selectedCostumerID, createNewTemplate]);

  // TODO: make update sideeffects

  console.log("store", store.EVENT_LIST);
  return (
    <AppContext.Provider
      value={{
        eventList: store.EVENT_LIST,
        betSlipListStore: store.BETSLIP_LIST,
        setBetSlipList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export { useAppContext };
