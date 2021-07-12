import React, { createContext, useState, useReducer } from "react";

export const Store = createContext("");

const initialState = {
  data: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export const StepperStore = createContext("");

const stepperInitialState = {
  data: [],
};

function stepperReducer(stepperState, action) {
  switch (action.type) {
    case 'STEP_DONE':
      return {...stepperState, data: action.payload};
    default:
      return stepperState
  }
}

export function StepperStoreProvider(props) {
  const [stepperState, stepperDispatch] = useReducer(stepperReducer, stepperInitialState);
  const value = { stepperState, stepperDispatch };
  return <StepperStore.Provider value={value}>{props.children}</StepperStore.Provider>;
}
