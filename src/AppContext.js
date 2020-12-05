// AppContext.js
import React, { useReducer } from "react";

const initialState = {
  listeDS: [],
  listeEleves: [],
  listeQuestions: {},
  notes: {},
  eleve: "Élève",
  devoir: "Devoir",
  toUpdate: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "LISTEQUESTIONS":
      return {
        ...state,
        listeQuestions: action.payload,
      };
    case "LISTEDS":
      return {
        ...state,
        listeDS: action.payload,
      };
    case "LISTEELEVES":
      return {
        ...state,
        listeEleves: action.payload,
      };
    case "ELEVE":
      return {
        ...state,
        eleve: action.payload,
      };
    case "DEVOIR":
      return {
        ...state,
        devoir: action.payload,
      };
    case "UPDATE":
      return {
        ...state,
        toUpdate: {
          ...state.toUpdate,
          [action.payload.key]: action.payload.value,
        },
      };
    case "RESETUPDATE":
      return {
        ...state,
        toUpdate: {},
      };
    default:
      return state;
  }
};

const AppContext = React.createContext(initialState);

const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
