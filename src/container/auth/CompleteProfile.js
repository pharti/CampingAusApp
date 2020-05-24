import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert
} from "react-native";
import * as AppAction from "../../actions";
import { invalidEmail, emailReg } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RF from "react-native-responsive-fontsize";
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet
} from "react-native-size-matters";
import { Checkbox } from "react-native-ui-lib";
const { height } = Dimensions.get("window");
import {
  back_arrow,
  underline,
  next_arrow,
  facebook,
  google,
  eye
} from "../../assets/";

class CompleteProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      valid: false
    };
    this.welcome = this.welcome.bind(this);
    this.onChangeTextCheck = this.onChangeTextCheck.bind(this);
    this.completeYourProfile = this.completeYourProfile.bind(this);
    this.forgot = this.forgot.bind(this);
  }

  welcome() {
    this.props.pop(this.props.componentId);
  }

  onChangeTextCheck = async (key, value) => {
    await this.setState({ [key]: value });
    let { email } = this.state;
    if (email && emailReg.test(email))
      this.setState({ valid: true, emailError: "" });
    else {
      if (key === "email" && !emailReg.test(email))
        this.setState({ emailError: invalidEmail });
      else this.setState({ emailError: "" });
      this.setState({ valid: false });
    }
  };

  completeYourProfile() {
    let body = {
      phone: this.props.phone,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.email &&
      this.state.password
    ) {
      this.props.completeProfile(body);
    } else {
      Alert.alert("Error", "All fields are mandotry ");
    }
  }

  forgot() {
    this.props.pushTParticulatScreen(this.props.componentId, "ForgotPassword");
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 0.05 }} />
        <View style={{ flex: 0.05, flexDirection: "row" }}>
          <View style={{ flex: 0.02 }} />
          <TouchableOpacity
            style={{ flex: 0.2 }}
            onPress={() => this.welcome()}
          >
            <Image
              source={back_arrow}
              style={{ flex: 1 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.05 }} />

        <View style={{ flex: 0.04, flexDirection: "row" }}>
          <View style={{ flex: 0.1 }} />
          <View style={{ flex: 0.8 }}>
            <Text
              style={{ fontSize: 18, color: "#ffffff", fontFamily: "OpenSans" }}
            >
              Complete Profile
            </Text>
          </View>

          <View style={{ flex: 0.1 }} />
        </View>
        <View style={{ flex: 0.05, flexDirection: "row" }}>
          <View style={{ flex: 0.11 }} />
          <Image
            source={underline}
            style={{ flex: 0.2 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ flex: 0.07, flexDirection: "row" }}>
          <View style={{ flex: 0.1 }} />
          <TouchableOpacity
            style={{
              flex: 0.8,
              backgroundColor: "#54E2FF",
              borderRadius: 5,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={facebook}
                style={{ flex: 0.5, marginLeft: RF(4) }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                flex: 0.6,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#32435F",
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                Continue with facebook
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 0.1 }} />
        </View>
        <View style={{ flex: 0.02 }} />
        <View style={{ flex: 0.07, flexDirection: "row" }}>
          <View style={{ flex: 0.1 }} />
          <TouchableOpacity
            style={{
              flex: 0.8,
              backgroundColor: "#FF7464",
              borderRadius: 5,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={google}
                style={{ flex: 0.45, marginLeft: RF(6) }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                flex: 0.55,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#32435F",
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                Continue with google
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 0.1 }} />
        </View>
        <View style={{ flex: 0.02 }} />
        <View style={{ flex: 0.4, flexDirection: "row" }}>
          <View style={{ flex: 0.1 }} />
          <View
            style={{
              flex: 0.8,
              flexDirection: "column",
              backgroundColor: "#3C5275"
            }}
          >
            <View
              style={{
                flex: 0.25,
                borderBottomWidth: 0.5,
                borderBottomColor: "#5580A0"
              }}
            >
              <TextInput
                placeholder="First name"
                placeholderTextColor="#687C9E"
                style={{
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 14,
                  color: "#FFFFFF",
                  marginLeft: RF(3),
                  marginTop: RF(3)
                }}
                onChangeText={firstName =>
                  this.setState({ firstName: firstName })
                }
              />
            </View>
            <View
              style={{
                flex: 0.25,
                borderBottomWidth: 0.5,
                borderBottomColor: "#5580A0"
              }}
            >
              <TextInput
                placeholder="Last name"
                placeholderTextColor="#687C9E"
                style={{
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 14,
                  color: "#FFFFFF",
                  marginLeft: RF(3),
                  marginTop: RF(3)
                }}
                onChangeText={lastName => this.setState({ lastName: lastName })}
              />
            </View>
            <View
              style={{
                flex: 0.25,
                borderBottomWidth: 0.5,
                borderBottomColor: "#5580A0"
              }}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#687C9E"
                style={{
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 14,
                  color: "#FFFFFF",
                  marginLeft: RF(3),
                  marginTop: RF(3)
                }}
                onChangeText={email => {
                  this.setState({ email: email });
                  this.onChangeTextCheck("email", email);
                }}
              />
            </View>
            {this.state.emailError ? (
              <Text style={styles.errorTexts}>{this.state.emailError}</Text>
            ) : null}
            <View
              style={{
                flex: 0.25,
                borderBottomWidth: 0.5,
                borderBottomColor: "#5580A0",
                flexDirection: "row"
              }}
            >
              <View style={{ flex: 0.8 }}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#687C9E"
                  secureTextEntry={this.state.show}
                  style={{
                    fontFamily: "OpenSans-SemiBold",
                    fontSize: 14,
                    color: "#FFFFFF",
                    marginLeft: RF(3),
                    marginTop: RF(3)
                  }}
                  onChangeText={password =>
                    this.setState({ password: password })
                  }
                />
              </View>
              <TouchableOpacity
                style={{ flex: 0.2, marginTop: RF(3) }}
                onPress={() => this.setState({ show: false })}
              >
                <Image
                  source={eye}
                  style={{ flex: 0.5, alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 0.1 }} />
        </View>
        <View style={{ flex: 0.03 }} />
        <View style={{ flex: 0.12, flexDirection: "row" }}>
          <View style={{ flex: 0.1 }} />
          <View style={{ flex: 0.5, flexDirection: "row" }}>
            <View style={{ flex: 0.2, marginTop: RF(3) }}>
              {/* <Checkbox value={true} borderRadius={2} color="#FFA654" /> */}
            </View>
            <View style={{ flex: 0.01 }} />
            <View style={{ flex: 0.8, flexDirection: "row", marginTop: RF(3) }}>
              {/* <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 14, color: "#687C9E" }}>Accept </Text>
                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 14, color: "#FFA654" }}>Terms & Policy 

                    </Text>*/}
            </View>
          </View>
          <View style={{ flex: 0.12 }} />
          {this.props.loading ? (
            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <TouchableOpacity
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: RF(1)
              }}
              onPress={() => this.completeYourProfile()}
            >
              <Image
                source={next_arrow}
                style={{ flex: 0.7, alignSelf: "center" }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ app, user, signup, login }) => {
  return {
    loading: login.loading,
    phone: user.userData ? user.userData.data.phone : ""
  };
};
const mapDispatchToProps = dispatch => ({
  completeProfile: data => dispatch(AppAction.completeProfile(data)),
  pop: componentId => dispatch(AppAction.pop(componentId)),
  pushTParticulatScreen: (componentId, name) =>
    dispatch(AppAction.pushTParticulatScreen(componentId, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfile);

const styles = ScaledSheet.create({
  input: {
    width: scale(300),
    fontSize: RF(2.5),
    height: "65@ms",
    backgroundColor: "#42A5F5",
    margin: 10,
    color: "white",
    padding: 8,
    borderRadius: moderateScale(30)
  },
  errorTexts: {
    margin: moderateScale(1),
    padding: moderateScale(10),
    fontSize: RF(1.5),
    color: "#ec4011"
  },
  resendLink: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(40),
    width: scale(120),
    borderRadius: moderateScale(30)
  },
  container: {
    height,
    backgroundColor: "#32435F"
  },
  resentText: {
    fontSize: RF(2),
    textAlign: "center",

    color: "#5cc174"
  },
  buttonView: {
    alignItems: "center",
    justifyContent: "center"
  }
});
