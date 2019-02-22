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
// import base64ToFile from "base64-to-file";
import {
  image64toCanvasRef,
  extractImageFileExtensionFromBase64,
  base64StringtoFile
} from "./ReUtilities";

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

  selectImage = () => {
    const options = {
      title: "Select Avatar",
      customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    // Function form the react-native-image-picker library
    ImagePicker.showImagePicker({ title: "Select Image" }, response => {
      // format the image data
      const image = {
        uri: response.uri,
        type: "image/jpeg",
        name: "myImage" + "-" + Date.now() + ".jpg"
      };
      console.log(response);
      // Instantiate a FormData() object
      const imgBody = new FormData();
      // append the image to the object with the title 'image'
      // console.log(image[0])
      imgBody.append("image",image);
      const url = `http://localhost:3001/addservice`;
      console.log(imgBody);
      // Perform the request. Note the content type - very important
      axios.post(url, { data: imgBody }).then(res => {
        console.log(res);
      });
      // fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: imgBody
      //   }).then(res => res.json()).then(results => {
      //     // Just me assigning the image url to be seen in the view
      //     // const source = { uri: res.imageUrl, isStatic: true };
      //     // const images = this.state.images;
      //     // images[index] = source;
      //     // this.setState({ images });
      //   console.error(results);
      // }).catch(error => {
      //   console.error(error);
      // });
    });
  };
  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  sendData = () => {
    console.log("call__________");
    const { avatar } = this.state;
    if (avatar) {
      console.log(avatar);
      // base64ToFile.convert(avatar, "upload/", ["jpg", "jpeg", "png"], function(
      //   filePath
      // ) {
      //   console.log(filePath);
      // });

      const url = `http://localhost:3001/addservice`;
      // console.log(imgBody)
      // Perform the request. Note the content type - very important
      const imgBody = new FormData();
      // append the image to the object with the title 'image'
      // console.log(image[0])
      // imgBody.append("image", blob);
      axios.post(url, { image: "data:image/jpeg;base64,"+avatar }).then(res => {
        console.log(res);
      });
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
              onChanged={(res)=>{
                console.log("Changdedd===>",res)
              }}
              ref={el => (this.canvas = el)}
            />
          </PhotoUpload>
          {/* <Image ref={el => (this.canvas = el)} style={{ display: "none" }} /> */}
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
            title="UPLOAD b64"
            onPress={this.sendData}
          />
        </View>
        <View style={styles.horCenterCont}>
          <Button
            containerStyle={{ width: "60%", marginTop: 20 }}
            buttonStyle={{ backgroundColor: "gray", borderRadius: 27 }}
            title="UPLOAD uri"
            onPress={this.selectImage}
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
