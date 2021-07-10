import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Report from './Report';
import Credit from './Credit';
import Booking from './Booking';
import QuestionsMock from './pages/QuestionsMock';
import { AnimatePresence } from "framer-motion";
import Stepper from './components/Stepper';

function App() {
  return (

      <Router>
        <AnimatePresence exitBeforeEnter>
          <div className="App">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/questions/:categoryIndex' component={QuestionsMock} />
              <Route path='/credit' component={Credit} />
              <Route path='/booking' component={Booking} />
              <Route path='/report' component={Report} />
              <Route path='/interview' component={Stepper} />
            </Switch>
          </div>
        </AnimatePresence>
      </Router>

  );
}

export default App;
