import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import LoginPage from "../components/LoginPage/LoginPage";
import Home from "../components/Home/Home";
import UploadData from "../components/UploadData/UploadData";
import { AsyncStorage } from "react-native";
import { Text } from 'react-native';
import { Icon } from 'react-native-elements'


class Route extends Component {
  async componentDidMount() {
    // var userData = await ASyncStorage.getItem('regStudent');
    // if(userData){
    //   console.log(userData);
    //   this.setState({logedIn: true})
    // }
  }

  render() {
    const TabIcon = (user) => {
      return <Icon
      name={user}
      type='font-awesome'
      // color='black'
      />;
    };

    return (
      <Router>
        <Stack key="root">
          <Scene key="loginpage" component={LoginPage} title="Login" />
          <Scene
            key="home"
            tabs={true}
            tabBarStyle={{ backgroundColor: "#FFFFFF" }}
          >
            {/* Tab and it's scenes */}
            <Scene key="homePage" title="homePage" component={Home} icon={() => <Icon
      name='home'
      type='font-awesome'
      // color='black'
      />} />
              {/* <Scene key="dashboard" component={Home} title="Dashboard" /> */}
              {/* <Scene key="loginpage" component={LoginPage} title="LoginPage" /> */}
            {/* </Scene> */}
            <Scene key="loginpage" title="LoginPage" component={LoginPage} icon={() => {TabIcon('user')}} />
              {/* <Scene key="loginpage" component={LoginPage} title="LoginPage" /> */}
              {/* <Scene key="loginpage" component={LoginPage} title="LoginPage" /> */}
            {/* </Scene> */}
          </Scene>
          <Scene key="uploaddata" component={UploadData} title="Upload Data" />
        </Stack>
      </Router>
    );
  }
}

export default Route;
