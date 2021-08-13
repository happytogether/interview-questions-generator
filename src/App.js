import React from 'react';
import './App.scss';
import { Switch, Route, useLocation} from 'react-router-dom';
import Home from './Home';
import Report from './pages/report/Report';
import Credit from './pages/credit/Credit';
import Booking from './pages/booking/Booking';
import InterviewContainer from './pages/interview/InterviewContainer';
import NewInterview from './pages/interview/NewInterview';
import Gallery from './pages/gallery/Gallery';
import GalleryList from './pages/gallery/GalleryList';
import { AnimatePresence } from "framer-motion";
import { LastLocationProvider } from 'react-router-last-location';
//import useGoogleAnalytics from './hooks/useGoogleAnalytics';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-204802540-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  const location = useLocation();
  return (
      <LastLocationProvider>
        <div className="App">
          <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path='/' component={Home} />
            <Route path='/interview/:categoryIndex' component={InterviewContainer} />
            <Route path='/interview' component={NewInterview} />
            <Route path='/gallery/:categoryIndex' component={Gallery} />
            <Route path='/gallery' component={GalleryList} />
            <Route path='/credit' component={Credit} />
            <Route path='/booking' component={Booking} />
            <Route path='/report' component={Report} />
          </Switch>
          </AnimatePresence>
        </div>
      </LastLocationProvider>

  );
}

export default App;
