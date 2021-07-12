import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MouseContextProvider from "./context/mouse-context";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider, StepperStoreProvider, StepsAnswersStoreProvider } from "./Store";

ReactDOM.render(
  <React.StrictMode>
      <StoreProvider>
        <MouseContextProvider>
          <StoreProvider>
            <StepsAnswersStoreProvider>
              <StepperStoreProvider>
                <App />
              </StepperStoreProvider>
            </StepsAnswersStoreProvider>
          </StoreProvider>
        </MouseContextProvider>
      </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
