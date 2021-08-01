import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MouseContextProvider from "./context/mouse-context";
import { BrowserRouter } from "react-router-dom";
import { HomeStoreProvider, QuestionsStoreProvider, QuestionsNumStoreProvider, StepperStoreProvider, UserAnswersStoreProvider } from "./Store";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <MouseContextProvider>
          <HomeStoreProvider>
            <QuestionsNumStoreProvider>
              <QuestionsStoreProvider>
                <UserAnswersStoreProvider>
                  <StepperStoreProvider>
                    <App />
                  </StepperStoreProvider>
                </UserAnswersStoreProvider>
              </QuestionsStoreProvider>
            </QuestionsNumStoreProvider>
          </HomeStoreProvider>
        </MouseContextProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
