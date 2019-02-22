import React, { Component } from "react";
import { Router, Stack, Scene, Tabs } from "react-native-router-flux";
import LoginPage from "../components/LoginPage/LoginPage";
import Home from "../components/Home/Home";
import UploadData from "../components/UploadData/UploadData";
import { Icon } from "react-native-elements";
import Profile from "../components/Profile/Profile";
import Services from "../components/Services/Services";
import ContactsList from "../components/ContactsList/ContactsList";
import AddService from "../components/AddService/AddService";

class Route extends Component {
  render() {
    const TabIcon = ({ focused, title }) => {
      switch (title) {
        case "home":
          console.log(focused);
          return (
            <Icon
              name="home"
              type="font-awesome"
              size={30}
              color={focused ? "lightgray" : "white"}
            />
          );
        case "profile":
          return (
            <Icon
              name="user"
              type="font-awesome"
              size={30}
              color={focused ? "lightgray" : "white"}
            />
          );
        default: {
          return (
            <Icon
              // name={focused ? "far fa-user" : "ios-speedometer-outline"}
              type="font-awesome"
              size={30}
              color={focused ? "lightgray" : "white"}
            />
          );
        }
      }
    };

    return (
      <Router>
        <Stack key="root">
          <Scene key="loginpage" component={LoginPage} title="Login" />

          <Scene
            key="home"
            tabs={true}
            showLabel={false}
            hideNavBar={true}
            tabBarPosition="bottom"
            activeBackgroundColor="gray"
            inactiveBackgroundColor="darkgray"
          >
            <Scene
              key="homePage"
              title="home"
              component={Home}
              icon={TabIcon}
              showLabel={false}
              hideNavBar={true}
            />
            <Scene
              key="profilePage"
              title="profile"
              // component={Profile}
              icon={TabIcon}
              showLabel={false}
              hideNavBar={true}
            >
              <Scene
                key="profilePageDashboard"
                // title="home"
                component={Profile}
                // icon={TabIcon}
                showLabel={false}
                hideNavBar={true}
              />
              <Scene
                key="profilePageServices"
                // title="home"
                component={Services}
                // icon={TabIcon}
                showLabel={false}
                hideNavBar={true}
              />
               <Scene
                key="contactListPage"
                // title="home"
                component={ContactsList}
                // icon={TabIcon}
                // showLabel={false}
                // hideNavBar={true}
              />
              <Scene
                key="addServicePage"
                // title="home"
                component={AddService}
                // icon={TabIcon}
                // showLabel={false}
                // hideNavBar={true}
              />
            </Scene>
          </Scene>

          <Scene key="uploaddata" component={UploadData} title="Upload Data" />
        </Stack>
      </Router>
    );
  }
}

export default Route;
