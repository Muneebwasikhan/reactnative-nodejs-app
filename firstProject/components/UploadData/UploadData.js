import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import {AsyncStorage} from 'react-native'

class UploadData extends Component {
  
  _asyncGetRegStudent = async () => {
    try{
      let user = await AsyncStorage.getItem('regStudent');
      alert(user);
    }
    catch(er){alert(er)}
  }
  componentDidMount() {
    this._asyncGetRegStudent();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Your are now loged in</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default UploadData;
