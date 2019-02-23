import React, { Component } from "react";
import { Router, Stack, Scene, Tabs, Actions } from "react-native-router-flux";
import { View } from "react-native";
import LoginPage from "../components/LoginPage/LoginPage";
import Home from "../components/Home/Home";
import UploadData from "../components/UploadData/UploadData";
import { Icon } from "react-native-elements";
import Profile from "../components/Profile/Profile";
import Services from "../components/Services/Services";
import ContactsList from "../components/ContactsList/ContactsList";
import AddService from "../components/AddService/AddService";
import { Header } from "react-native-elements";
import SearchPage from "../components/SearchPage/SearchPage";
import Activites from "../components/Activites/Activites";
import { AsyncStorage } from "react-native";
import Chat from "../components/Messages/Chat";
import AllMessages from "../components/Messages/AllMessages";

const ElementHeader = props => {
  console.log(props);
  return (
    <Header
      backgroundColor="#6200EE"
      leftComponent={
        <Icon
          name="envelope"
          type="font-awesome"
          color="#fff"
          // size={30}
        />
      }
      centerComponent={{
        text: "CHACHU",
        style: { color: "#fff", fontFamily: "Kailasa-Bold", ontWeight: "bold" }
      }}
      rightComponent={
        <Icon
          name="sign-out"
          type="font-awesome"
          color="#fff"
          onPress={() => {
            AsyncStorage.clear(() => {
              console.log("cleared storage");
              Actions.replace("loginpage");
            });
          }}
          // size={30}
        />
      }
    />
  );
};
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
              color={focused ? "#6200EE" : "#6200ee7a"}
            />
          );
        case "profile":
          return (
            <Icon
              name="user"
              type="font-awesome"
              size={30}
              color={focused ? "#6200EE" : "#6200ee7a"}
            />
          );
        case "Search":
          return (
            <Icon
              name="search"
              type="font-awesome"
              size={30}
              color={focused ? "#6200EE" : "#6200ee7a"}
            />
          );
        case "Activites":
          return (
            <Icon
              name="bell"
              type="font-awesome"
              size={30}
              color={focused ? "#6200EE" : "#6200ee7a"}
            />
          );
        default: {
          return (
            <Icon
              // name={focused ? "far fa-user" : "ios-speedometer-outline"}
              type="font-awesome"
              size={30}
              color={focused ? "#6200EE" : "#6200ee7a"}
            />
          );
        }
      }
    };

    return (
      <Router navBar={ElementHeader}>
        <Stack key="root">
          <Scene
            key="loginpage"
            component={LoginPage}
            title="Login"
            hideNavBar={true}
          />

          <Scene
            key="home"
            tabs={true}
            showLabel={false}
            hideNavBar={true}
            tabBarPosition="bottom"
            // activeBackgroundColor="gray"
            // inactiveBackgroundColor="darkgray"
          >
            <Scene
              key="homePage"
              title="home"
              component={Home}
              icon={TabIcon}
              showLabel={false}
              // hideNavBar={true}
            />
            <Scene
              key="searchPage"
              title="Search"
              component={SearchPage}
              icon={TabIcon}
              showLabel={false}
              hideNavBar={true}
            />
            <Scene
              key="activitesPage"
              title="Activites"
              component={Activites}
              icon={TabIcon}
              showLabel={false}
              // hideNavBar={true}
            />
            <Scene
              key="profilePage"
              title="profile"
              // component={Profile}
              icon={TabIcon}
              showLabel={false}
              // hideNavBar={true}
            >
              <Scene
                key="profilePageDashboard"
                // title="home"
                component={Profile}
                // icon={TabIcon}
                showLabel={false}
                // hideNavBar={true}
              />
              <Scene
                key="profilePageServices"
                // title="home"
                component={Services}
                // icon={TabIcon}
                showLabel={false}
                // hideNavBar={true}
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
              <Scene
                key="uploaddata2" component={UploadData}
                // icon={TabIcon}
                // showLabel={false}
                // hideNavBar={true}
              />
            </Scene>
          </Scene>

          <Scene key="chatpage" hideNavBar={true} component={Chat} title="Chat" />
          <Scene key="allmessages" component={AllMessages} title="Chats" />
          <Scene key="uploaddata" component={UploadData} title="Upload Data" />
        </Stack>
      </Router>
    );
  }
}

export default Route;
