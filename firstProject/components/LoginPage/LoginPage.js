import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { LoginButton } from "react-native-fbsdk";
import FacebookBtn from "../FacebookBtn";
// const FBSDK = require('react-native-fbsdk');
import FBSDK, { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import { Actions } from "react-native-router-flux";

class LoginPage extends Component {
  _fbAuth = () => {
    // Attempt a login using the Facebook login dialog,
    // asking for default permissions.
    LoginManager.logInWithReadPermissions().then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login was cancelled");
        } else {
          console.log(result);
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data);
            let accessToken = data.accessToken
            alert(accessToken.toString())

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error)
                alert('Error fetching data: ' + error.toString());
              } else {
                console.log(result);

              }
            }

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name'
                  }
                }
              },
              responseInfoCallback
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function(error) {
        console.log("Login failed with error: " + error);
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Facebook Login</Text>
        <FacebookBtn />
        <Button title="fb login" onPress={this._fbAuth} />
        <Button
          title="Home"
          onPress={() => {
            Actions.replace("home");
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
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

export default LoginPage;
