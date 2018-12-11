import React, { Component } from 'react';
import Dashboard from './Dashboard'
// import { GoogleLogin } from 'react-google-login'

class App extends Component {


  render() {
    return (
      <div className="App">
        <Dashboard />

      </div>
    );
  }
}

export default App;
// GET https://www.googleapis.com/gmail/v1/users/newtest1233219417%40gmail.com/profile?key=[YOUR_API_KEY] HTTP/1.1