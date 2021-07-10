import React, { createContext, useState } from "react";

export const StepperContext = createContext({
  stepperSteps: "",
  stepperStepsChangeHandler: () => {},
});

const StepperContextProvider = (props) => {
  const [stepperSteps, setStepperSteps] = useState("");

  const stepperStepsChangeHandler = (stepperSteps) => {
    setStepperSteps(stepperSteps);
  };

  return (
    <StepperContext.Provider
      value={{
        stepperSteps: stepperSteps,
        stepperStepsChangeHandler: stepperStepsChangeHandler,
      }}
    >
      {props.children}
    </StepperContext.Provider>
  );
};

export default StepperContextProvider;
