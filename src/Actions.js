const HOMEPAGE_API_URL =
  "/home.json";
const INTERVIEW_QUESTIONS_API_URL =
  "/interview_questions.json";
const QUESTIONS_GALLERY_API_URL =
  "/questions/1.json";

/* three initial data,
   also use this data in local storage */

export const initialInterviewCategoryQuestionsCount = () => {
  //localStorage.setItem('test', JSON.stringify([1,2,3,4]));
  return [5,3,3,2];
}

export const initialInterviewCategoryQuestionsAnswers = () => {
  return [[],[],[],[]];
}

export const initialInterviewCategroyStepsCompleted = () => {
  return [];
}

/* homepage.json we need to fetch
   including section title & section description */
export const fetchHomepageJsonAction = async (dispatch) => {
  const data = await fetch(HOMEPAGE_API_URL);
  const dataJSON = await data.json();
  return dispatch({
    type: "FETCH_HOMEPAGE_DATA",
    payload: dataJSON
  });
};

/* we need to fetch interview category questions data
   in interview_questions.json file */
export const fetchInterviewCategoryQuestionsJsonAction = async (dispatch, userPickedInterviewCategoryQuestionsCount) => {
  const data = await fetch(INTERVIEW_QUESTIONS_API_URL);
  const dataJSON = await data.json();
  dataJSON.filter((item, index) => {
    // filter out unused questions here and dispatch to store
    item.questions.length = userPickedInterviewCategoryQuestionsCount[index] || initialInterviewCategoryQuestionsCount()[index];
  })
  return dispatch({
    type: "FETCH_INTERVIEW_CATEGORY_QUESTIONS_DATA",
    payload: dataJSON
  });
};

export const fetchInterviewCategoryQuestionsCountAction = async (countState, countDispatch) => {
  //const temp = JSON.parse(localStorage.getItem('questionsNum'));
  localStorage.setItem('questionsNumState', JSON.stringify(countState));
  return countDispatch ({
    type: "FETCH_INTERVIEW_CATEGORY_QUESTIONS_COUNT_DATA",
    payload: countState
  })
};

export const fetchInterviewCategoryStepDoneAction = async (stepState, stepDispatch) => {
  return stepDispatch({
    type: "FETCH_INTERVIEW_CATEGORY_STEP_DONE_DATA",
    payload: stepState
  })
}

export const fetchInterviewCategoryUserAnswers = async (userAnswersState, userAnswersDispatch) => {
  return userAnswersDispatch({
    type: "FETCH_INTERVIEW_CATEGORY_USER_ANSWERS",
    payload: userAnswersState
  })
}

// interactive actions here
export const stepDoneAction = async (state, dispatch) => {
  //const stepDoneInStepper = state.stepper.includes(stepIndex);
  return dispatch({
    type: "STEP_DONE",
    payload: state
  });
};

export const stepResetAction = async (state, dispatch) => {
  //const stepDoneInStepper = state.stepper.includes(stepIndex);
  localStorage.setItem('stepperState', JSON.stringify(state));
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
  localStorage.setItem('userAnswersState', JSON.stringify(state));
  return dispatch({
    type: "STEP_RESET_ANSWERS",
    payload: state
  });
}

/*export const fetchQuestionsGalleryDataAction = async (dispatch, index) => {
  const data = await fetch(QUESTIONS_GALLERY_API_URL+'/'+index+'.json');
  const dataJSON = await data.json();
  return dispatch({
    type: "FETCH_QUESTIONS_GALLERY_DATA",
    payload: dataJSON
  });
};*/

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
