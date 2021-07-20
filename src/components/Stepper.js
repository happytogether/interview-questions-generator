import { HomeStore, StepperStore } from "../Store";
import { useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import DelayLink from '../ultils/DelayLink';

export default function Stepper(props) {
  const { state, dispatch } = useContext(HomeStore);
  const { stepperState, stepperDispatch } = useContext(StepperStore);
  const steps = state.data.length;
  const activeStep = props.activeStep; // index is 0 based
  const completedSteps = stepperState.data || [];
  let stepsArray = [];
  stepsArray.length = steps;
  stepsArray = stepsArray.fill("");

  return (
    <div className="w-full flex items-center justify-center absolute z-10 sm:relative">
      <div className="sm:w-screen w-4/12 p-1 mt-4" style={{"background": "rgba(0,0,0,.8)"}}>
        <div className="flex flex-row items-start">
          {
            stepsArray.map((item, index) => (
              index==0 ? (
                <div className="flex-1 relative">
                  <span className="flex-col flex items-center">
                    <span className="flex flex-shrink-0">
                      <div className={`flex items-center stepper-dot-container ${completedSteps.indexOf(index) > -1 ? "completed": ""} ${index == activeStep? " active": ""}`} style={{"color": "#784af4", "height": "22px"}}>
                        <DelayLink delay="300" to={`./${index}`}><div className="stepper-dot"></div></DelayLink>
                        <Link to={`./${index}`}><svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg></Link>
                      </div>
                    </span>
                  </span>
                </div>
              ): (
                <div className="flex-1 relative">
                  <div className="stepper-line-container flex-auto absolute">
                    <span className={`block stepper-line ${completedSteps.indexOf(index-1) > -1 ? " completed": ""}`}></span>
                  </div>
                  <span className="flex-col flex items-center">
                    <span className="flex flex-shrink-0">
                      <div className={`flex items-center stepper-dot-container ${completedSteps.indexOf(index) > -1 ? "completed": ""} ${index == activeStep? " active": ""}`} style={{"color": "#784af4", "height": "22px"}}>
                        <DelayLink delay="300" to={`./${index}`}><div className="stepper-dot"></div></DelayLink>
                        <DelayLink delay="300" to={`./${index}`}><svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg></DelayLink>
                      </div>
                    </span>
                  </span>
                </div>
              )
            ))
          }
        </div>
      </div>
    </div>
  );
}
