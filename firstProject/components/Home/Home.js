import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView
} from "react-native";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  RkCard,
  rkCardImg,
  RkTheme,
  RkText,
  rkType,
  RkButton
} from "react-native-ui-kitten";
import {Header} from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import { UtilStyles } from "./utilsStyle";
import { ImageIcon } from "./imageIcon";
import Axios from "axios";
import path from "../../config/Path";

RkTheme.setType('RkText', 'cardPrice', {
  color: '#6200EE',
  paddingLeft: 15,
  fontWeight: 'bold'
});

class Home extends Component {

  state = {
    feed: []
  }
  _asyncGetRegStudent = async () => {
    try {
      let user = await AsyncStorage.getItem("regStudent");
      console.log(user);
    } catch (er) {
      console.log(er);
    }
  };
  componentDidMount() {
    this._asyncGetRegStudent().then(stdData => {
      Axios.post(path.GET_SERVICES).then(data => {
        if(data.data.success){
          console.log(data.data.data);
          this.setState({feed: data.data.data})
        }
        else{
          alert('An error occur!');
        }
        console.log(data);
      })
    });
  }

  render() {
    const { feed } = this.state;
    return (
      <View>
        {/* <Header
        backgroundColor= '#6200EE'
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/> */}
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[ styles.screen]}
        >
        
        {feed.map((value,index) => (<View style={{paddingTop: 10,paddingBottom: 10}}>
          
          <RkCard key={value}>
            <View rkCardHeader={true}>
              <View>
                <RkText rkType="header">{value.title}</RkText>
                <RkText rkType="subtitle">{value.category}</RkText>
              </View>
            </View>
            <Image
              rkCardImg={true}
              source={{
                uri: value.imageUrl
              }}
            />
            <View rkCardContent={true}>
              <RkText rkType="cardText">
              {value.discription}
              </RkText>
            </View>
            <View >
              <RkText rkType="cardPrice">
              Rs: {value.amount} 
              </RkText>
            </View>
            <View rkCardFooter={true}>
              {/* <RkButton rkType="clear link"> */}
                {/* <Icon name="heart" style={likeStyle} /> */}
                {/* <RkText rkType="accent">18 Likes</RkText> */}
              {/* </RkButton> */}
              <RkButton rkType="clear link">
                {/* <Icon name="comment-o" style={iconButton} /> */}
                <RkText rkType="hint">Open</RkText>
              </RkButton>
              <RkButton rkType="clear link">
                {/* <Icon name="send-o" style={iconButton} /> */}
                <RkText rkType="hint">Order</RkText>
              </RkButton>
            </View>
          </RkCard>
        </View>
        ))}  
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#f0f1f5',
    // padding: 12,
  },
  buttonIcon: {
    marginRight: 7,
    fontSize: 19.7,
  },
  footer: {
    marginHorizontal: 16,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 17,
  },
  dot: {
    fontSize: 6.5,
    color: '#0000008e',
    marginLeft: 2.5,
    marginVertical: 10,
  },
  floating: {
    width: 56,
    height: 56,
    position: 'absolute',
    zIndex: 200,
    right: 16,
    top: 173,
  },
  footerButtons: {
    flexDirection: 'row',
  },
  overlay: {
    justifyContent: 'flex-end',
    paddingVertical: 23,
    paddingHorizontal: 16,
  },
});

export default Home;
