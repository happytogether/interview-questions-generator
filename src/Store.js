import React, { createContext, useState, useReducer } from "react";
const CategoryCounts = 4;

export const HomeStore = createContext("");

const initialState = {
  data: [],
};

function homeReducer(state, action) {
  switch (action.type) {
    case "FETCH_HOMEPAGE_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export function HomeStoreProvider(props) {
  const [state, homeDispatch] = useReducer(homeReducer, initialState);
  const value = { state, homeDispatch };
  return <HomeStore.Provider value={value}>{props.children}</HomeStore.Provider>;
}

export const QuestionsStore = createContext("");



function questionsReducer(questionsState, action) {
  switch (action.type) {
    case "FETCH_INTERVIEW_CATEGORY_QUESTIONS_DATA":
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
    case "FETCH_INTERVIEW_CATEGORY_QUESTIONS_COUNT_DATA": //[5,3,2,2]
      return { ...questionsNumState, data: action.payload };
    default:
      return questionsNumState;
  }
}

const questionsStoreLocalStorage = JSON.parse(localStorage.getItem('questionsNumState'));
const questionsNumInitialState = {
  data: questionsStoreLocalStorage ? questionsStoreLocalStorage : [5,3,3,2]
};

export function QuestionsNumStoreProvider(props) {
  const [questionsNumState, questionsNumDispatch] = useReducer(questionsNumReducer, questionsNumInitialState);
  const value = { questionsNumState, questionsNumDispatch };
  return <QuestionsNumStore.Provider value={value}>{props.children}</QuestionsNumStore.Provider>;
}

export const StepperStore = createContext("");


const stepperStoreLocalStorage = JSON.parse(localStorage.getItem('stepperState'));
const stepperInitialState = {
  data: stepperStoreLocalStorage ? stepperStoreLocalStorage : []
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

let create2dArray =  Array.from(Array(CategoryCounts), () => {
  return new Array;
})

const userAnswersLocalStorage = JSON.parse(localStorage.getItem('userAnswersState'));
const userAnswersInitialState = {
  data: userAnswersLocalStorage ? userAnswersLocalStorage : create2dArray
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
