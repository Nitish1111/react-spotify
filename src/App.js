import React, { Component } from "react";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import hash from "./hash";
import logo from "./logo.svg";
import "./App.css";
import Home from "./home";
import { primary, backgrounds, extended } from '@uprise/colors';

//import config from './config1';
var config = {
  "clientId": "3ef1d13e43a34f449452c1fc45e8e9a5",
  "clientSecret": "e20cfe570f7f49d5ba0704e9bc26d464",
  "redirectUri": "http://localhost:3000/redirect",
  "accessToken": ""
}
const authEndpoint = "https://accounts.spotify.com/authorize";
const scopes = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private"
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null
    };
  }
  componentDidMount() {


    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }

  }

  

  render() {
    return (
      <div className="App">
        

        <Router>
          <div className="App" style={{backgroundColor:backgrounds.fadedPurple}}>
            <div className='container'>
              {/* <Header /> */}
              <Route exact path='/' render={props => (
                <React.Fragment>
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {!this.state.token && (
                      <a
                        className="btn btn--loginApp-link"
                        href={`${authEndpoint}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${scopes.join(
                          "%20"
                        )}&response_type=token&show_dialog=true`}
                      >
                        Login to Spotify
                      </a>
                    )}</header>
                </React.Fragment>
              )} />
              <Route path='/redirect' component={Home} />
              {/* <Route path='/redirect' render={routeProps => <Home {...routeProps} config={config}/>}/> */}
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
