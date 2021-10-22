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
import HomePage from "./pages/homePage";
import LandingPage from "./pages/landingPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/news">
          <NewsPage />
        </Route>
        <Route path="/calendar">
          <Calendar />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
