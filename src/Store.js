import React, { createContext, useState, useReducer } from "react";

const CategoryLength = 4;
export const HomeStore = createContext("");

const initialState = {
  data: [],
};

function homeReducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export function HomeStoreProvider(props) {
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const value = { state, dispatch };
  return <HomeStore.Provider value={value}>{props.children}</HomeStore.Provider>;
}

export const QuestionsStore = createContext("");

function questionsReducer(questionsState, action) {
  switch (action.type) {
    case "FETCH_QUESTIONS_DATA":
      console.log('got questions data');
      return { ...questionsState, data: action.payload };
    default:
      return questionsState;
  }
}

const questionsInitialState = {
  data: [],
};
export function QuestionsStoreProvider(props) {
  const [questionsState, dispatch] = useReducer(questionsReducer, questionsInitialState);
  const value = { questionsState, dispatch };
  return <QuestionsStore.Provider value={value}>{props.children}</QuestionsStore.Provider>;
}

export const QuestionsNumStore = createContext("");

function questionsNumReducer(questionsNumState, action) {
  switch (action.type) {
    case "FETCH_QUESTIONS_NUM_DATA": //[5,3,2,2]
      return { ...questionsNumState, data: action.payload };
    default:
      return questionsNumState;
  }
}

const questionsNumInitialState = {
  data: [],
};

export function QuestionsNumStoreProvider(props) {
  const [questionsNumState, questionsNumDispatch] = useReducer(questionsNumReducer, questionsNumInitialState);
  const value = { questionsNumState, questionsNumDispatch };
  return <QuestionsNumStore.Provider value={value}>{props.children}</QuestionsNumStore.Provider>;
}

export const StepperStore = createContext("");

const stepperInitialState = {
  data: [],
};

function stepperReducer(stepperState, action) {
  switch (action.type) {
    case 'STEP_DONE':
      return {...stepperState, data:action.payload};
    case 'STEP_RESET': {
      return {...stepperState, data:action.payload};
    }
    default:
      return stepperState
  }
}

export function StepperStoreProvider(props) {
  const [stepperState, stepperDispatch] = useReducer(stepperReducer, stepperInitialState);
  const value = { stepperState, stepperDispatch };
  return <StepperStore.Provider value={value}>{props.children}</StepperStore.Provider>;
}


export const UserAnswersStore = createContext("");

let create2dArray =  Array.from(Array(CategoryLength), () => {
  return new Array;
})
const userAnswersInitialState = {
  data: create2dArray
};

function userAnswersReducer(userAnswersState, action) {
  switch (action.type) {
    case 'STEP_ADD_ANSWERS':
      return {...userAnswersState, data:action.payload};
    case 'STEP_RESET_ANSWERS':
      return {...userAnswersState, data:action.payload};
    default:
      return userAnswersState
  }
}

export function UserAnswersStoreProvider(props) {
  const [userAnswersState, userAnswersDispatch] = useReducer(userAnswersReducer, userAnswersInitialState);
  const value = { userAnswersState, userAnswersDispatch };
  return <UserAnswersStore.Provider value={value}>{props.children}</UserAnswersStore.Provider>;
}
