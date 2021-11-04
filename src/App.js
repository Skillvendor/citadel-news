import React from 'react';
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import './App.css';
import Calendar from './pages/calendar';
// import NewsPage from './pages/newsPage';
import HomePage from "./pages/homePage";
import CalendarAdmin from './pages/calendarAdmin';
import DiscordRequest from './requests/discordRequest';
import StandardRequest from './requests/standardRequest';

// import LandingPage from "./pages/landingPage";
import { getToken, setToken, deleteToken } from './lib/auth';
import { getDiscordCode } from './lib/url';
import CircularProgress from '@mui/material/CircularProgress';

const CenteredLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0px 0px -50px;
`;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCitizen: false,
      loading: true
    }
  }

  async authenticate(accessToken) {
    let userIdentity
    try {
      userIdentity = await DiscordRequest.get('users/@me', {
        headers: {
          authorization: 'Bearer ' + accessToken
        }
      })
    } catch (e) {
      // token probably expired
      deleteToken()
      this.setState({ loading: false })
      return
    }

    const userId = userIdentity?.data?.id;

    const memberRequest = new StandardRequest(process.env.REACT_APP_CITIZENS_SERVER)
    const { data: { members: discordMembers } } = await memberRequest.get('citizens.json')

    if(discordMembers.includes(userId)) {
      this.setState({ isCitizen: true, loading: false })
    }
  }

  async componentDidMount() {
    let accessToken = getToken()

    if (accessToken) {
      await this.authenticate(accessToken)
      return
    }

    const discordCode = getDiscordCode()
    if(discordCode) {
      let discordAuthResp
      try {
        discordAuthResp = await DiscordRequest.getAuthorizationCode(discordCode)
      } catch (e) {
        // used token, need another
        window.location.href = process.env.REACT_APP_REDIRECT_URL
      }

      accessToken = discordAuthResp?.data?.access_token
      setToken(accessToken)

      await this.authenticate(accessToken)
      this.setState({ loading: false })

      return
    }

    this.setState({ loading: false })
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path="/calendarAdmin">
              <CalendarAdmin />
            </Route>
            <Route path="/">
            {
              this.state.loading ? (
                <CenteredLoader >
                  <CircularProgress />
                </CenteredLoader>
              ) :
                this.state.isCitizen ? (
                  <Calendar />
                ) : (
                  <HomePage />
                )
            }
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    )

  }
}

export default App;
