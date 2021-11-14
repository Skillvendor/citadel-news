import React from 'react';
import AdminLogin from '../components/adminLogin';

import AdminAuth from '../lib/firebase/adminAuth';
import AdminEvents from '../components/adminEvents';
import AdminTable from '../components/adminTable';
import AdminVideo from '../components/adminVideo';

export default class NTCalendarAdmin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdmin: false
    }
  }

  handleAuth = async (email, pass) => {
    const isAdmin = await AdminAuth.signIn(email, pass);

    this.setState({ isAdmin })
  }


  render() {
    return(
      this.state.isAdmin ? (
      // true ? (
        <React.Fragment>
          <AdminEvents />
          <AdminVideo />
          <AdminTable />
        </React.Fragment>
      ) : (
        <AdminLogin handleAuth={this.handleAuth} />
      )
    )
  }
};
