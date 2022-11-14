import React, { createContext, useReducer } from 'react';
// ----------------------------------------------------------------------

const initialState = {
  isOpened: false,
  severity: 'success',
  message: ''
};

const handlers = {
  INITIALIZE: (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  },
  SET_IS_OPENED: (state, action) => {
    return {
      ...state,
      isOpened: action.payload
    };
  },
  SET_SEVERITY: (state, action) => {
    return {
      ...state,
      severity: action.payload
    };
  },
  SET_MESSAGE: (state, action) => {
    return {
      ...state,
      message: action.payload
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const AlertMessageContext = createContext({
  ...initialState,
  openAlert: () => Promise.resolve(),
  closeAlert: () => Promise.resolve()
});

//  Provider
function AlertMessageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Visible the alert message
   * @param {object} param0 
   */
  const openAlert = ({ severity, message }) => {
    dispatch({
      type: 'SET_IS_OPENED',
      payload: true
    });
    dispatch({
      type: 'SET_SEVERITY',
      payload: severity
    });
    dispatch({
      type: 'SET_MESSAGE',
      payload: message
    });
  };

  /**
   * Unvisible the alert message
   */
  const closeAlert = () => {
    dispatch({
      type: 'INITIALIZE',
      payload: {
        isOpened: false,
        severity: '',
        message: ''
      }
    });
  };

  return (
    <AlertMessageContext.Provider
      value={{
        ...state,
        openAlert,
        closeAlert
      }}
    >
      {children}
    </AlertMessageContext.Provider>
  );
}

export { AlertMessageContext, AlertMessageProvider };