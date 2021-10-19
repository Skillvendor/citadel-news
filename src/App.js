import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import './App.css';
// import Citizenship from './components/citizenship';
import Calendar from './components/calendar';
import NewsPage from './pages/newsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/calendar">
          <Calendar />
        </Route>
        <Route path="/">
          <NewsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
