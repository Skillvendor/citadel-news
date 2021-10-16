import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Citizenship from './components/citizenship';
import Calendar from './components/calendar';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/calendar">
            <Calendar />
          </Route>
          <Route path="/">
            <Citizenship />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
