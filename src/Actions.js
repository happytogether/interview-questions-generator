const API_URL =
  "/home.json";
const QUESTIONS_API_URL =
  "/questions.json";

export const defaultQuestionsNum = () => {
  return [5,3,3,2];
}


/* Home pages - one action */
export const fetchDataAction = async (dispatch) => {
  const data = await fetch(API_URL);
  const dataJSON = await data.json();
  return dispatch({
    type: "FETCH_DATA",
    payload: dataJSON
  });
};

/* new interview -
  1. data for category
  2. Interview Questions Num Array
*/

// init questions data or fetch questions data
export const fetchQuestionsDataAction = async (dispatch, userCustomizedQuestionsNumArray) => {
  const data = await fetch(QUESTIONS_API_URL);
  const dataJSON = await data.json();
  dataJSON.filter((item, index) => {
    item.questions.length = userCustomizedQuestionsNumArray[index] || defaultQuestionsNum()[index];
  })
  return dispatch({
    type: "FETCH_QUESTIONS_DATA",
    payload: dataJSON
  });
};

export const fetchQuestionsNumDataAction = async (questionsNumState, questionsNumDispatch) => {
  return questionsNumDispatch({
    type: "FETCH_QUESTIONS_NUM_DATA",
    payload: questionsNumState
  })
};

export const stepDoneAction = async (state, dispatch) => {
  //const stepDoneInStepper = state.stepper.includes(stepIndex);
  return dispatch({
    type: "STEP_DONE",
    payload: state
  });
};

export const stepResetAction = async (state, dispatch) => {
  //const stepDoneInStepper = state.stepper.includes(stepIndex);
  return dispatch({
    type: "STEP_RESET",
    payload: state
  });
};

export const stepsAddAnswersAction = async (state, dispatch) => {
  return dispatch({
    type: "STEP_ADD_ANSWERS",
    payload: state
  });
}

export const stepsResetAnswersAction = async (state, dispatch) => {
  return dispatch({
    type: "STEP_RESET_ANSWERS",
    payload: state
  });
}

/*export const fetchStepsDoneLocalStorageAction = async (dispatch, categoryIndex) => {
  const data = JSON.parse(localStorage.getItem('category'+categoryIndex));
  return dispatch({
    type: "FETCH_STEPS_DONE_DATA",
    payload: data
  });
};

export const toggleFavAction = (episode, state, dispatch) => {
  const episodeInFavourites = state.favourites.includes(episode);
  let dispatchObj = {
    type: "ADD_FAV",
    payload: episode
  };
  if (episodeInFavourites)
    dispatchObj = {
      type: "REMOVE_FAV",
      payload: state.favourites.filter(fav => fav.id !== episode.id)
    };
  return dispatch(dispatchObj);
};*/
