import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { ListItem, Header, Icon } from "react-native-elements";
import { Actions } from 'react-native-router-flux';

class AllMessages extends Component {
  state = {
    refreshing: false
  };
  _asyncGetRegStudent = async () => {
    try {
      let user = await AsyncStorage.getItem("regStudent");
      return JSON.parse(user);
    } catch (er) {
      return false;
    }
  };

  _onRefresh = () => {};

  componentDidMount() {
    this._asyncGetRegStudent().then(user => {
      console.log(user.studentData.userName)
      this.setState({userData: user.studentData})
      
    })
  }
  render() {
    const list = [
      {
        name: "Amy Farha",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        subtitle: "Vice President"
      },
      {
        name: "Chris Jackson",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        subtitle: "Vice Chairman"
      }
    ];
    const { userData } = this.state;
    return (
      <View style={styles.container}>
     <Header
      backgroundColor="#6200EE"
      leftComponent={
        <TouchableOpacity
          onPress={() => {
            Actions.pop();
          }}
        >
          <Icon name="chevron-left" type="font-awesome" color="white" />
        </TouchableOpacity>
      }
      centerComponent={{
        text: `${userData ? userData.userName : ''}`,
        style: { color: "#fff", fontFamily: "Kailasa-Bold", fontWeight: "bold" }
      }}
      rightComponent={{
        text: `+`,
        style: { color: "#fff",fontSize: 25 }
      }}
    />
        {/* <ModalService modalVisible={ modalVisible } modalInvisible={(visible) => {this.setState({modalVisible: visible})}} /> */}
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    padding: 0,
    margin: 0,
    width: "100%"
  },
  container: {
    backgroundColor: "white",
    padding: 0,
    margin: 0
  },
  cardStyle: {
    width: "100%",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 5,
    marginBottom: 0
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default AllMessages;
