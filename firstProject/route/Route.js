import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import LoginPage from '../components/LoginPage/LoginPage';
import Home from '../components/Home/Home';
import UploadData from '../components/UploadData/UploadData';

class Route extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="loginpage" component={LoginPage} title="Login" />
          <Scene key="home" component={Home} title="Home" />
          <Scene key="uploaddata" component={UploadData} title="Upload Data" />
        </Stack>
      </Router>
    );
  }
}

export default Route;
