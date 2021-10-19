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
import { useMoralis, useMoralisQuery } from "react-moralis";
import HomePage from "./pages/homePage";

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
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

function Roles() {
  const { data, error, isLoading } = useMoralisQuery("_Role", (query) =>
    query.equalTo("name", "Citizen")
  );

  if (error) {
    return <pre>error</pre>;
  }

  if (isLoading) {
    return <pre>loading...</pre>;
  }

  if (data.length > 0) {
    return <h2>CITZEN</h2>;
  }
  return <h2>RAT</h2>;
}

function Issues() {
  const { data, error, isLoading } = useMoralisQuery("News");

  if (error) {
    return <pre>Access denied</pre>;
  }

  if (isLoading) {
    return <pre>loading...</pre>;
  }

  return (
    <div>
      <h2>News</h2>
      {data.map((value, index) => {
        const file = value.get("pdf");
        return <pre><a href={file.url()}>{value.get("title")}</a></pre>;
      })}
    </div>
  );
}

export default App;
