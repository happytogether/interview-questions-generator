import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Report from './pages/report/Report';
import Credit from './pages/credit/Credit';
import Booking from './pages/booking/Booking';
import QuestionsContainer from './pages/questions/QuestionsContainer';
import { AnimatePresence } from "framer-motion";

function App() {
  return (

      <Router>
        <AnimatePresence exitBeforeEnter>
          <div className="App">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/questions/:categoryIndex' component={QuestionsContainer} />
              <Route path='/credit' component={Credit} />
              <Route path='/booking' component={Booking} />
              <Route path='/report' component={Report} />
            </Switch>
          </div>
        </AnimatePresence>
      </Router>

  );
}

export default App;
