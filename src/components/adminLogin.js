import React from 'react';

export default class AdminLogin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      pass: '',
    }
  }

  handleChange(event, field) {
    this.setState({[`${field}`]: event.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.email} onChange={(e) => this.handleChange(e, 'email')} />
        <input type="password" value={this.state.pass} onChange={(e) => this.handleChange(e, 'pass')} />
        <button onClick={() => this.props.handleAuth(this.state.email, this.state.pass)}>Sign In</button>
      </div>
    );
  }
}


