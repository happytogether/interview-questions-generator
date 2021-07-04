import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Report from './Report';
import Credit from './Credit';
import QuestionsMock from './pages/QuestionsMock';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/questions/:categoryIndex' component={QuestionsMock} />
          <Route path='/credit' component={Credit} />
          <Route path='/report' component={Report} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
