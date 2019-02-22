import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

class Services extends Component {
  _asyncGetRegStudent = async () => {
    try {
      let user = await AsyncStorage.getItem("regStudent");
      console.log(user);
    } catch (er) {
      console.log(er);
    }
  };
  componentDidMount() {
    this._asyncGetRegStudent();
  }
  render() {
    const users = [
      {
        name: "brynn",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
      }
    ];

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* <Text style={styles.welcome}>Services</Text> */}
          <Button
            title="Add Services"
            onPress={() => {
              console.log(Actions);
              Actions.addServicePage();
            }}
          />

          <Card
            containerStyle={styles.cardStyle}
            title="HELLO WORLD"
            image={{
              uri:
                "https://statusgalaxy.com/wp-content/uploads/photo-gallery/thumb/happiness_whatsapp_dp_(12).jpg"
            }}
          >
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
            <Button
              icon={<Icon name="code" color="#ffffff" />}
              backgroundColor="#03A9F4"
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              title="VIEW NOW"
            />
          </Card>
          <Card
            containerStyle={styles.cardStyle}
            title="HELLO WORLD"
            image={{
              uri:
                "https://d1r8m46oob3o9u.cloudfront.net/images/home-demo-photo-2c.jpg"
            }}
          >
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
            <Button
              icon={<Icon name="code" color="#ffffff" />}
              backgroundColor="#03A9F4"
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              title="VIEW NOW"
            />
          </Card>
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
    // flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "center",
    // backgroundColor: "#F5FCFF",
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

export default Services;
