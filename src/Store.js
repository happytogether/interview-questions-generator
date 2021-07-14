import React, { createContext, useState, useReducer } from "react";

const CategoryLength = 4;
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
      return {...stepperState, data:action.payload};
    default:
      return stepperState
  }
}

export function StepperStoreProvider(props) {
  const [stepperState, stepperDispatch] = useReducer(stepperReducer, stepperInitialState);
  const value = { stepperState, stepperDispatch };
  return <StepperStore.Provider value={value}>{props.children}</StepperStore.Provider>;
}


export const StepsAnswersStore = createContext("");

let create2dArray =  Array.from(Array(CategoryLength), () => {
  return new Array;
})
const stepsAnswersInitialState = {
  data: create2dArray
};

function stepsAnswersReducer(stepsAnswersState, action) {
  switch (action.type) {
    case 'STEP_ADD_ANSWERS':
      return {...stepsAnswersState, data:action.payload};
    case 'STEP_RESET_ANSWERS':
      return {...stepsAnswersState, data:action.payload};
    default:
      return stepsAnswersState
  }
}

export function StepsAnswersStoreProvider(props) {
  const [stepsAnswersState, stepsAnswersDispatch] = useReducer(stepsAnswersReducer, stepsAnswersInitialState);
  const value = { stepsAnswersState, stepsAnswersDispatch };
  return <StepsAnswersStore.Provider value={value}>{props.children}</StepsAnswersStore.Provider>;
}
