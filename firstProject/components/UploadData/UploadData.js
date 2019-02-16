import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from "react-native";
import { AsyncStorage } from "react-native";
import { Image } from "react-native";
import PhotoUpload from "react-native-photo-upload";

class UploadData extends Component {
  state = {
    myNumber: ""
  };

  onChanged(text) {
    if ((text * 1 && text.length < 11) || text == "" || text == "0") {
      this.setState({ myNumber: text });
      console.log(text);
    } else if (text.length > 10) {
      console.log("it should be les then 11");
    } else {
      alert("Char not allowed");
    }
  }

  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <View
        //  style={}
        >
          <PhotoUpload
          containerStyle={{width: 150, height: 150, backgroundColor: 'powderblue'}}
            onPhotoSelect={avatar => {
              if (avatar) {
                console.log("Image base64 string: ", avatar);
              }
            }}
          >
            <Image
              style={{
                 paddingVertical: 30,
                width: 150,
                height: 150,
                borderRadius: 75
              }}
              resizeMode="cover"
              source={{
                uri:
                  "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
              }}
            />
          </PhotoUpload>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={text => this.onChanged(text)}
            value={this.state.myNumber}
            maxLength={10} //setting limit of input
          />
        </View>

        {/* <Image source={this.state.avatarSource} style={styles.uploadAvatar} /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  textInput: {
    backgroundColor: "red",
    width: 100,
    height: 40
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

export default UploadData;
