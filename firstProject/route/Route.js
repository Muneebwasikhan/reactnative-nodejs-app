import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import LoginPage from '../components/LoginPage/LoginPage';
import Home from '../components/Home/Home';

class Route extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="loginpage" component={LoginPage} title="LoginPage" />
          <Scene key="home" component={Home} title="Home" />
        </Stack>
      </Router>
    );
  }
}

export default Route;
