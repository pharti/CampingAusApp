import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import * as AppAction from "../../actions";
import { getLocation, getToken } from '../../utilities/'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RF from "react-native-responsive-fontsize"
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import {Form, Item, Input } from 'native-base';
import {back_arrow,underline,next_arrow} from '../../assets/'


class NumberSignin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      'visible': false,
      'lengthV': false,
      'location': '',
      'token': '',
      'loading':false
    };
    this.welcome = this.welcome.bind(this)
    this.signin = this.signin.bind(this)
    this.forgot = this.forgot.bind(this)
  }

  async componentDidMount() {
    this.setState({'loading':this.props.loading})
    getLocation((err, res) => {
      console.log("res res ", err, res)
      this.setState({ 'location': res });
    })

    // let token = await getToken();
    // this.setState({ token: token })

  }

  welcome() {
    this.props.pop(this.props.componentId);
  }

  signin(phone) {

    let body = {
      'phone': phone,
      'latitude': this.state.location?this.state.location.coords.latitude?this.state.location.coords.latitude:'':'',
      'longitude': this.state.location?this.state.location.coords.longitude? this.state.location.coords.longitude:'':'',
      'deviceToken': this.state.token? this.state.token:''
    }
    console.log("body=======",body)
    if (phone.length < 8 && phone.length > 1) {
      this.setState({ 'lengthV': true, 'visible': false })
    }
    else if (phone.length > 8) {
      this.props.login(body, this.props.componentId)
    }
    else {
      this.setState({ 'visible': true })
    }

  }

  forgot() {
    this.props.pushTParticulatScreen(this.props.componentId, 'OtpVerify')
  }

  render() {
    return (

      <KeyboardAwareScrollView contentContainerStyle={styles.container}>

        <View style={{ flex: 0.05 }} />
        <View style={{ flex: 0.05, flexDirection: "row" }}>
          <View style={{ flex: 0.02 }} />
          <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this.welcome()}>
            <Image source={back_arrow} style={{ flex: 1 }} resizeMode="contain" />
          </TouchableOpacity>

        </View>

        <View style={{ flex: 0.05 }} />

        <View style={{ flex: 0.04, flexDirection: "row" }}>
          <View style={{ flex: 0.1 }} />
          <View style={{ flex: 0.8 }}>
            <Text style={{ fontSize: 18, color: "#ffffff", fontFamily: "OpenSans" }}>Continue with Phone Numer</Text>
          </View>

          <View style={{ flex: 0.1 }} />
        </View>
        <View style={{ flex: 0.05, flexDirection: "row" }}>
          <View style={{ flex: 0.11 }} />
          <Image source={underline} style={{ flex: 0.2 }} resizeMode="contain" />
        </View>
        <View style={{ flex: 0.05 }} />
        <View style={{ flex: 0.13, flexDirection: "row" }}>

          <View style={{ flex: 0.05 }} />
          <View style={{ flex: 0.85 }}>
            <Form>
              <Item underline={false} style={{ borderBottomColor: "#3C5275" }}>
                <Input placeholder="Enter your phone number" keyboardType="phone-pad" maxLength={15} placeholderTextColor="#687C9E" style={{ backgroundColor: "#3C5275", height: 60, borderBottomColor: "#3C5275", borderBottomWidth: 0, fontFamily: "OpenSans-SemiBold", color: "#FFFFFF", paddingLeft: RF(5) }} onChangeText={(phone) => this.setState({ 'phone': phone })} />
              </Item>
              {this.state.phone.length < 1 ? this.state.visible ? <Text style={{ fontSize: 14, fontFamily: "OpenSans-SemiBold", color: "#ff3333", marginLeft: RF(2) }}>*Please enter number</Text> : null : null}
              {this.state.lengthV ? <Text style={{ fontSize: 14, fontFamily: "OpenSans-SemiBold", color: "#ff3333", marginLeft: RF(2) }}>*Number must be more then 10 digits</Text> : null}
            </Form>
          </View>

        </View>

        <View style={{ flex: 0.1, flexDirection: "row" }}>
          <View style={{ flex: 0.2 }} />
          <View style={{ flex: 0.6 }}>
            <Text style={{ alignSelf: "center", alignItems: "center", fontSize: 14, color: "#5580A0", fontFamily: "OpenSans-SemiBold" }}>Please enter your phone number</Text>
            <Text style={{ alignSelf: "center", alignItems: "center", fontSize: 14, color: "#5580A0", fontFamily: "OpenSans-SemiBold" }}> so we will send you OTP</Text>
          </View>
          <View style={{ flex: 0.2 }} />
        </View>

        <View style={{ flex: 0.08 }} />
        <View style={{ flex: 0.12, flexDirection: "row" }}>
          <View style={{ flex: 0.72 }}>
          </View>
          {this.props.loading ? <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}><ActivityIndicator /></View> : <TouchableOpacity style={{ flex: 0.2, justifyContent: "center" }} onPress={() => { this.signin(this.state.phone) }}>
            <Image source={next_arrow} style={{ flex: 0.7, alignSelf: "center" }} resizeMode="contain" />
          </TouchableOpacity>}
        </View>


      </KeyboardAwareScrollView>

    );
  }
}

const mapStateToProps = ({ user }) => {

  return {
    "loading":false
  }
};

const mapDispatchToProps = dispatch => ({
  login: (data, componentId) => dispatch(AppAction.login(data, componentId)),
  forgotPassword: (email, componentId) => dispatch(forgotPassword(email, componentId)),
  pop: (componentId) => dispatch(AppAction.pop(componentId)),
  pushTParticulatScreen: (componentId, name) =>
    dispatch(AppAction.pushTParticulatScreen(componentId, name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberSignin);

const styles = ScaledSheet.create({
  input: {
    width: scale(300),
    fontSize: RF(2.5),

    height: '65@ms',
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
    color: '#ec4011'
  },
  resendLink: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(40),
    width: scale(120),
    borderRadius: moderateScale(30)
  },
  container: {
    flex: 1,
    backgroundColor: "#32435F"
  },
  resentText: {
    fontSize: RF(2),
    textAlign: "center",

    color: "#5cc174"
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
