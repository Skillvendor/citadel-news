import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
//import Citizenship from "./components/citizenship";
import Calendar from "./components/calendar";
import { useMoralis, useMoralisQuery } from "react-moralis";

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

function Citizenship() {
  const { authenticate, logout, isAuthenticated, user } = useMoralis();

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => authenticate()}>Authenticate</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user.get("ethAddress")}</h1>
      <Roles></Roles>
      <Issues></Issues>
      <button onClick={() => logout()}>Logout</button>
    </div>
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
    return <pre>CITZEN</pre>;
  }
  return <pre>RAT</pre>;
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
      {data.map((value, index) => {
        return <pre>{value.get("title")}</pre>;
      })}
    </div>
  );
}

export default App;
