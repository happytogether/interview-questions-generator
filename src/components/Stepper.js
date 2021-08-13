import { HomeStore, StepperStore } from "../Store";
import { useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import DelayLink from '../ultils/DelayLink';

export default function Stepper(props) {
  const { state, dispatch } = useContext(HomeStore);
  const { stepperState, stepperDispatch } = useContext(StepperStore);
  const steps = props.steps;
  const activeStep = props.activeStep; // index is 0 based
  const completedSteps = stepperState.data;

  return (
    <div className="w-full flex items-center absolute justify-center z-50 sm:relative">
      <div className="sm:w-auto w-4/12 p-1 mt-4 sm:mt-0" style={{"background": "rgba(0,0,0,.8)"}}>
        <div className="flex flex-row items-start">
          {
            [...Array(steps).keys()].map((item, index) => (
              index==0 ? (
                <div key={index} className="flex-1 relative sm:px-1">
                  <span className="flex-col flex items-center">
                    <span className="flex flex-shrink-0">
                      <div className={`flex items-center stepper-dot-container ${completedSteps.indexOf(index) > -1 ? "completed": ""} ${index == activeStep? " active": ""}`} style={{"color": "#784af4", "height": "22px"}}>
                        <DelayLink to={`./${index}`}><div className="stepper-dot"></div></DelayLink>
                        <Link to={`./${index}`}><svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg></Link>
                      </div>
                    </span>
                  </span>
                </div>
              ): (
                <div key={index} className="flex-1 relative sm:px-1">
                  <div className="stepper-line-container flex-auto absolute">
                    <span className={`block stepper-line ${completedSteps.indexOf(index-1) > -1 ? " completed": ""}`}></span>
                  </div>
                  <span className="flex-col flex items-center">
                    <span className="flex flex-shrink-0">
                      <div className={`flex items-center stepper-dot-container ${completedSteps.indexOf(index) > -1 ? "completed": ""} ${index == activeStep? " active": ""}`} style={{"color": "#784af4", "height": "22px"}}>
                        <DelayLink to={`./${index}`}><div className="stepper-dot"></div></DelayLink>
                        <DelayLink to={`./${index}`}><svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg></DelayLink>
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
