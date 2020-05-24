import { SERVER_URL } from "../../constants/url";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImagePicker from "react-native-image-picker";
import * as AppAction from "../../actions";
import {
  userProfile,
  backBlackArrow,
  editBlack,
  right_arow
} from "../../assets";
import { Form, Item, Input, Label, Icon } from "native-base";
import RF from "react-native-responsive-fontsize";

const imageOptions = {
  title: "Select Image",
  quality: 0.3,
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

class UserProfile extends React.Component {
  static options(passProps) {
    return {};
  }
  constructor(props) {
    super(props);
    (this.state = {
      source: ""
    }),
      (this.OpenImage = this.OpenImage.bind(this));
    this.uploadPic = this.uploadPic.bind(this);
    this.profile = this.profile.bind(this);
    this.change = this.change.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
  }

  OpenImage() {
    let auth = this.props.auth;
    ImagePicker.showImagePicker(imageOptions, response => {
      console.log("imageresponse-------------90", response);
      if (response.uri) {
        let imgSource = { uri: response.uri };
        this.setState({ source: imgSource });
        this.uploadPic(response);
      }
    });
  }

  uploadPic(image) {
    let body = {
      userId: this.props.userId,
      uploadImage: image
    };
    console.log("body", body);
    this.props.addUserPic(body);
  }
  componentWillMount() {
    let Upimage = SERVER_URL + "/" + this.props.image;
    console.log("sdfsdfsdfsdf", Upimage);
    this.setState({ source: Upimage });
  }
  profile() {
    this.props.pop(this.props.componentId);
  }
  change() {
    this.props.pushTParticulatScreen(this.props.componentId, "ForgotPassword");
  }
  updateNumber() {
    this.props.pushTParticulatScreen(this.props.componentId, "EditNumber");
  }
  updateEmail() {
    this.props.pushTParticulatScreen(this.props.componentId, "UpdateEmail");
  }
  render() {
    let firstName = this.props.firstName;
    let lastName = this.props.lastName;
    let email = this.props.email;
    let phone = this.props.phone;
    let image = this.props.image;
    console.log("image========", image);

    return (
      <View style={styles.container}>
        <View style={{ flex: 0.4 }}>
          {this.props.isloading ? (
            <View
              style={{
                flex: 0.4,
                justifyContent: "center",
                alignSelf: "center"
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <ImageBackground
              source={
                this.props.image
                  ? { uri: SERVER_URL + "/" + this.props.image }
                  : userProfile
              }
              style={{ flex: 1, flexDirection: "row" }}
              resizeMode="contain"
            >
              <TouchableOpacity
                style={{
                  flex: 0.2,
                  marginHorizontal: RF(2),
                  marginVertical: RF(2)
                }}
                onPress={() => this.profile()}
              >
                <Image
                  source={backBlackArrow}
                  style={{ flex: 0.15 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={{ flex: 0.6 }} />
              <TouchableOpacity
                style={{ flex: 0.2, marginVertical: RF(2) }}
                onPress={() => this.OpenImage()}
              >
                <Image
                  source={editBlack}
                  style={{ flex: 0.15 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </ImageBackground>
          )}
        </View>
        <View style={{ flex: 0.05 }} />
        <View style={{ flex: 0.05, marginHorizontal: RF(2) }}>
          <Text
            style={{
              fontSize: 26,
              color: "#ffffff",
              fontFamily: "OpenSans-SemiBold"
            }}
          >
            {firstName} {lastName}
          </Text>
        </View>
        <View style={{ flex: 0.05 }} />
        <View style={{ flex: 0.25, flexDirection: "row" }}>
          <View style={{ flex: 0.95 }}>
            <Form>
              <Item floatingLabel>
                <Label style={{ color: "#687C9E" }}>Email</Label>
                <Image source={right_arow} />
                <Input
                  style={{
                    color: "#ffffff",
                    fontSize: 18,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                  value={email}
                  editable={false}
                />
                <Icon
                  style={{ color: "#687C9E", fontSize: RF(5), padding: RF(1) }}
                  type="FontAwesome"
                  name="angle-right"
                  onPress={() => this.updateEmail()}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ color: "#687C9E" }}>Phone number</Label>
                <Input
                  style={{
                    color: "#ffffff",
                    fontSize: 18,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                  value={phone}
                  editable={false}
                />
                <Icon
                  style={{ color: "#687C9E", fontSize: RF(5), padding: RF(1) }}
                  type="FontAwesome"
                  name="angle-right"
                  onPress={() => this.updateNumber()}
                />
              </Item>
            </Form>
          </View>
          <View style={{ flex: 0.05 }} />
        </View>
        <View style={{ flex: 0.07, flexDirection: "row" }}>
          <View style={{ flex: 0.1 }} />
          <TouchableOpacity
            style={{
              flex: 0.8,
              borderWidth: 2,
              borderColor: "#FFA654",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => this.change()}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#FFA654",
                alignSelf: "center",
                fontFamily: "OpenSans-SemiBold"
              }}
            >
              Change Password
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 0.1 }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32435F"
  }
});

const mapStateToProps = ({ app, user, signup, login }) => {
  console.log("123456", user);
  return {
    firstName: user.userData.data ? user.userData.data.firstName : "",
    lastName: user.userData.data ? user.userData.data.lastName : "",
    email: user.userData.data ? user.userData.data.email : "",
    phone: user.userData.data ? user.userData.data.phone : "",
    image: user.userData.data ? user.userData.data.image : "",
    userId: user.userData.data ? user.userData.data._id : "",
    isloading: user.isloading ? user.isloading : false,
    type: user.userData.data ? user.userData.data.loginType : ""
  };
};
const mapDispatchToProps = dispatch => ({
  logOut: type => dispatch(AppAction.logout(type)),
  AppAction: bindActionCreators(AppAction, dispatch),
  addUserPic: data => dispatch(AppAction.addUserPic(data)),
  pushTParticulatScreen: (componentId, name) =>
    dispatch(AppAction.pushTParticulatScreen(componentId, name)),
  pop: componentId => dispatch(AppAction.pop(componentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
