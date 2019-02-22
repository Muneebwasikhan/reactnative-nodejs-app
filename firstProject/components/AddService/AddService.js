import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TextInput } from "react-native";
import { AsyncStorage } from "react-native";
import { Image } from "react-native";
import PhotoUpload from "react-native-photo-upload";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import axios from "axios";
import path from "../../config/Path";
import ImagePicker from "react-native-image-picker";



class AddService extends Component {
  state = {
    myNumber: "",
    profilePhoto:
      "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg",
    avatar: ""
  };

  onChanged(text) {
    if ((text * 1 && text.length < 12) || text == "" || text == "0") {
      this.setState({ myNumber: text });
      console.log(text);
    } else if (text.length > 10) {
      console.log("it should be les then 11");
    } else {
      console.log("Char not allowed");
    }
  }

  
  sendData = () => {
    console.log("call__________");
    const { avatar } = this.state;
    if (avatar) {
      console.log(JSON.stringify(avatar));
      // var photo = {
      //   data: avatar,
      //   type: 'image/jpeg',
      //   name: 'photo.jpg',
      // };
      // let formdata = new FormData();
      // formdata.append("image", JSON.stringify(photo));
      // fetch("http://localhost:3001/addservice", {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   },
      //   body: formdata
      // }).then(data=>{
      //   console.log(data)
      // }).catch(err =>{
      //   console.log(err);
      // });
    }
  };
  updateData = () => {
    const { myNumber, profilePhoto } = this.state;
    this._asyncGetRegStudent().then(res => {
      if (res) {
        axios
          .post(path.UPDATE_NUMBER_PROFILE, {
            fbId: res.studentData.fbId,
            phoneNumber: myNumber,
            profilePhoto: profilePhoto
          })
          .then(data => {
            console.log(data);
          });
      }
    });
  };

  _asyncGetRegStudent = async () => {
    try {
      let user = await AsyncStorage.getItem("regStudent");
      return JSON.parse(user);
    } catch (er) {
      return false;
    }
  };
  componentDidMount() {
    this._asyncGetRegStudent();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 200 }}>
          {/* <Image source={this.state.avatarSource} style={styles.uploadAvatar} /> */}
          <PhotoUpload
            onPhotoSelect={avatar => {
              if (avatar) {
                console.log("Image base64 string: ", avatar);
                this.setState({ avatar });
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
                uri: this.state.profilePhoto
              }}
            />
          </PhotoUpload>
        </View>
        <View style={{ ...styles.horCenterCont }}>
          <Input
            placeholder="Enter you Number"
            containerStyle={styles.textInput}
            inputStyle={{ paddingLeft: 10, color: "gray" }}
            onChangeText={text => this.onChanged(text)}
            value={this.state.myNumber}
            inputContainerStyle={{
              backgroundColor: "lightgray",
              borderWidth: 0,
              borderRadius: 27
            }}
            leftIcon={{
              type: "font-awesome",
              name: "phone",
              size: 20,
              color: "gray"
            }}
          />
        </View>
        <View style={styles.horCenterCont}>
          <Button
            containerStyle={{ width: "60%", marginTop: 20 }}
            buttonStyle={{ backgroundColor: "gray", borderRadius: 27 }}
            title="UPLOAD"
            onPress={this.sendData}
          />
        </View>
       
        {/* <Image source={this.state.avatarSource} style={styles.uploadAvatar} /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonUpdate: {
    width: "70%",
    backgroundColor: "gray",
    borderRadius: 27
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  horCenterCont: {
    display: "flex",
    alignItems: "center"
  },
  textInput: {
    // paddingLeft: 20,
    // backgroundColor: "#ebebeb",
    // borderRadius: 27,
    // fontSize: 15,
    width: "70%",
    color: "gray",
    // height: 50,
    margin: "auto"
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

export default AddService;
