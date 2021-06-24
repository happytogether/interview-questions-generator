import './App.scss';
import {useRoutes} from 'hookrouter';
import Home from './Home';
import Report from './Report';


function App() {
  const routes = {
    '/' :()=><Home/>,
    '/report' :()=> <Report />
   };
  const routeResults = useRoutes(routes);
  return (
    <div className="App">
      {routeResults ||<h1>PAGE  NOT FOUND</h1>}
    </div>
  );
}

export default App;
