const API_URL =
  "/professional.json";

export const fetchDataAction = async (dispatch, string) => {
  const data = await fetch(API_URL);
  const dataJSON = await data.json();
  return dispatch({
    type: "FETCH_DATA",
    payload: dataJSON
  });
};

export const stepDoneAction = async (state, stepperDispatch) => {
  //const stepDoneInStepper = state.stepper.includes(stepIndex);
  return stepperDispatch({
    type: "STEP_DONE",
    payload: state
  });
};

/*export const toggleFavAction = (episode, state, dispatch) => {
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
