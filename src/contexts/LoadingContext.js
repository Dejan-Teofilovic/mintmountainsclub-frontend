import React, { createContext, useReducer } from 'react';

const initialState = {
  isLoading: false,
};

const handlers = {
  INITIALIZE: (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  },
  SET_IS_LOADING: (state, action) => {
    return {
      ...state,
      isLoading: action.payload
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const LoadingContext = createContext({
  ...initialState,
  openLoading: () => Promise.resolve(),
  closeLoading: () => Promise.resolve()
});

//  Provider
function LoadingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openLoading = () => {
    dispatch({
      type: 'SET_IS_LOADING',
      payload: true
    });
  };

  const closeLoading = () => {
    dispatch({
      type: 'INITIALIZE',
      payload: {
        isLoading: false,
      }
    });
  };

  return (
    <LoadingContext.Provider
      value={{
        ...state,
        openLoading,
        closeLoading
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export { LoadingContext, LoadingProvider };