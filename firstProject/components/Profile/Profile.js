import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { ListItem, Icon } from 'react-native-elements'
import { AsyncStorage } from 'react-native'
import { Actions } from "react-native-router-flux";

class AddService extends Component {
  
  _asyncGetRegStudent = async () => {
    try{
      let user = await AsyncStorage.getItem('regStudent');
      console.log(user);
    }
    catch(er){console.log(er)}
  }
  componentDidMount() {
    this._asyncGetRegStudent();
  }
  render() {
    const list = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      }
    ];

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Profile</Text>

        <ListItem
      containerStyle={{width: '100%'}}
        leftIcon={() => (<Icon
          name="cogs"
          type="font-awesome"
          color="gray"
        />)}
        title={'Services'}
        // subtitle={l.subtitle}
        badge={{ value: 3, textStyle: { color: 'white' } }}
        onPress={() => {Actions.profilePageServices()}}
      />
      <ListItem
      containerStyle={{width: '100%'}}
        leftIcon={() => (<Icon
          name="cogs"
          type="font-awesome"
          color="gray"
        />)}
        title={'Contacts'}
        // subtitle={l.subtitle}
        badge={{ value: 3, textStyle: { color: 'white' } }}
        onPress={() => {Actions.contactListPage()}}
      />
      
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
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

export default AddService;
