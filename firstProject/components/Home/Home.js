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
import Icon from "react-native-vector-icons/FontAwesome";
import { UtilStyles } from "./utilsStyle";
import { ImageIcon } from "./imageIcon";

RkTheme.setType('RkText', 'cardPrice', {
  color: 'blue',
  paddingLeft: 15,
  fontWeight: 'bold'
});

class Home extends Component {
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
    const likeStyle = [styles.buttonIcon, { color: RkTheme.colors.accent }];
    const iconButton = [
      styles.buttonIcon,
      { color: RkTheme.current.colors.text.hint }
    ];
    return (
      <View>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[ styles.screen]}
        >
          <RkCard>
            <View rkCardHeader={true}>
              <View>
                <RkText rkType="header">Title</RkText>
                <RkText rkType="subtitle">Category</RkText>
              </View>
            </View>
            <Image
              rkCardImg={true}
              source={{
                uri:
                  "https://helpx.adobe.com/in/stock/how-to/visual-reverse-image-search/_jcr_content/main-pars/image.img.jpg/visual-reverse-image-search-v2_1000x560.jpg"
              }}
            />
            <View rkCardContent={true}>
              <RkText rkType="cardText">
              Discription
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </RkText>
            </View>
            <View >
              <RkText rkType="cardPrice">
              Rs:/ 500
              </RkText>
            </View>
            <View rkCardFooter={true}>
              <RkButton rkType="clear link">
                <Icon name="heart" style={likeStyle} />
                <RkText rkType="accent">18 Likes</RkText>
              </RkButton>
              <RkButton rkType="clear link">
                <Icon name="comment-o" style={iconButton} />
                <RkText rkType="hint">2 Comments</RkText>
              </RkButton>
              <RkButton rkType="clear link">
                <Icon name="send-o" style={iconButton} />
                <RkText rkType="hint">6 Shares</RkText>
              </RkButton>
            </View>
          </RkCard>
          {/* <RkCard>
            <View rkCardHeader={true}>
              <View>
                <RkText rkType="header">Header</RkText>
                <RkText rkType="subtitle">Subtitle</RkText>
              </View>
            </View>
            <Image
              rkCardImg={true}
              source={{
                uri:
                  "https://helpx.adobe.com/in/stock/how-to/visual-reverse-image-search/_jcr_content/main-pars/image.img.jpg/visual-reverse-image-search-v2_1000x560.jpg"
              }}
            />
            <View rkCardContent={true}>
              <RkText rkType="cardText">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </RkText>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType="clear link accent">
                <Icon name="heart" style={likeStyle} />
                <RkText rkType="accent">18</RkText>
              </RkButton>
              <RkButton rkType="clear link">
                <Icon name="comment-o" style={iconButton} />
                <RkText rkType="hint">2</RkText>
              </RkButton>
              <RkButton rkType="clear link">
                <Icon name="send-o" style={iconButton} />
                <RkText rkType="hint">6</RkText>
              </RkButton>
            </View>
          </RkCard> */}
          {/* <RkCard>
            <View rkCardHeader={true}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri:
                      "https://helpx.adobe.com/in/stock/how-to/visual-reverse-image-search/_jcr_content/main-pars/image.img.jpg/visual-reverse-image-search-v2_1000x560.jpg"
                  }}
                  style={styles.avatar}
                />
                <View style={{}}>
                  <RkText rkType="header">Elena Zhukova</RkText>
                  <RkText rkType="subtitle">6 minutes ago</RkText>
                </View>
              </View>
              <RkButton rkType="clear">
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
              </RkButton>
            </View>
            <View rkCardContent={true}>
              <RkText rkType="cardText">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </RkText>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType="clear link accent">
                <Icon name="heart" style={likeStyle} />
                <RkText rkType="accent">18</RkText>
              </RkButton>
              <RkButton rkType="clear link">
                <Icon name="comment-o" style={iconButton} />
                <RkText rkType="hint">2</RkText>
              </RkButton>
              <RkButton rkType="clear link">
                <Icon name="send-o" style={iconButton} />
                <RkText rkType="hint">6</RkText>
              </RkButton>
            </View>
          </RkCard> */}
          {/* <RkCard rkType="shadowed">
            <View>
              <Image
                rkCardImg={true}
                source={{
                  uri:
                    "https://helpx.adobe.com/in/stock/how-to/visual-reverse-image-search/_jcr_content/main-pars/image.img.jpg/visual-reverse-image-search-v2_1000x560.jpg"
                }}
              />
              <View rkCardImgOverlay={true} />
            </View>
            <RkButton rkType="circle accent-bg" style={styles.floating}>
              <ImageIcon name="plus" />
            </RkButton>
            <View rkCardHeader={true} style={{ paddingBottom: 2.5 }}>
              <View>
                <RkText rkType="header xxlarge">Header</RkText>
                <RkText rkType="subtitle">Subtitle</RkText>
              </View>
            </View>
            <View rkCardContent={true}>
              <RkText rkType="compactCardText">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </RkText>
            </View>
            <View rkCardFooter={true}>
              <View style={styles.footerButtons}>
                <RkButton rkType="clear action" style={{ marginRight: 16 }}>
                  SHARE
                </RkButton>
                <RkButton rkType="clear action">EXPLORE</RkButton>
              </View>
            </View>
          </RkCard> */}
          {/* <RkCard rkType="shadowed">
            <View>
              <Image
                rkCardImg={true}
                source={{
                  uri:
                    "https://helpx.adobe.com/in/stock/how-to/visual-reverse-image-search/_jcr_content/main-pars/image.img.jpg/visual-reverse-image-search-v2_1000x560.jpg"
                }}
              />
              <View rkCardImgOverlay={true} style={styles.overlay}>
                <RkText rkType="header xxlarge" style={{ color: "white" }}>
                  Header
                </RkText>
              </View>
            </View>
            <RkButton rkType="circle accent-bg" style={styles.floating}>
              <ImageIcon name="plus" />
            </RkButton>
            <View rkCardHeader={true} style={{ paddingBottom: 2.5 }}>
              <View>
                <RkText rkType="subtitle">Subtitle</RkText>
              </View>
            </View>
            <View rkCardContent={true}>
              <RkText rkType="compactCardText">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </RkText>
            </View>
            <View rkCardFooter={true}>
              <View style={styles.footerButtons}>
                <RkButton rkType="clear action" style={{ marginRight: 16 }}>
                  SHARE
                </RkButton>
                <RkButton rkType="clear action">EXPLORE</RkButton>
              </View>
            </View>
          </RkCard> */}
          {/* <RkCard rkType="heroImage shadowed">
            <View>
              <Image
                rkCardImg={true}
                source={{
                  uri:
                    "https://helpx.adobe.com/in/stock/how-to/visual-reverse-image-search/_jcr_content/main-pars/image.img.jpg/visual-reverse-image-search-v2_1000x560.jpg"
                }}
              />
              <View rkCardImgOverlay={true} style={styles.overlay}>
                <View style={{ marginBottom: 20 }}>
                  <RkText rkType="header xxlarge" style={{ color: "white" }}>
                    Header
                  </RkText>
                  <RkText rkType="subtitle" style={{ color: "white" }}>
                    Subtitle
                  </RkText>
                </View>
                <View style={styles.footerButtons}>
                  <RkButton rkType="clear" style={{ marginRight: 16 }}>
                    SHARE
                  </RkButton>
                  <RkButton rkType="clear ">EXPLORE</RkButton>
                </View>
              </View>
            </View>
          </RkCard> */}
          {/* <RkCard>
            <View rkCardHeader={true}>
              <View>
                <RkText rkType="header">Header</RkText>
                <RkText rkType="subtitle">Subtitle</RkText>
              </View>
            </View>
            <View rkCardContent={true} style={{ paddingTop: 0 }}>
              <RkText rkType="compactCardText">
                The Big Oxmox advised her not to do so, because there were
                thousands of bad Commas, wild Question Marks and devious
                Semikoli, but the Little Blind Text didn’t listen.
              </RkText>
            </View>
            <View rkCardFooter={true}>
              <View style={styles.footerButtons}>
                <RkButton rkType="clear action" style={{ marginRight: 16 }}>
                  SHARE
                </RkButton>
                <RkButton rkType="clear action">EXPLORE</RkButton>
              </View>
            </View>
          </RkCard> */}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#f0f1f5',
    padding: 12,
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
