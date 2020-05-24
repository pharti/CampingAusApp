import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import * as AppAction from "../../actions";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RF from "react-native-responsive-fontsize"
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import { Form, Item, Input } from 'native-base';
import { underline, back_arrow, next_arrow } from '../../assets/'
class EditNumber extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      visible: false,
      lengthV: false,
    };
    this.welcome = this.welcome.bind(this)
    this.PhoneUpdate = this.PhoneUpdate.bind(this)
    
  }

  welcome() {
    this.props.pop(this.props.componentId);
  }

  PhoneUpdate(phone) {

    let body = {
      userId: this.props.userId,
      phoneNumber: phone
    }
    this.props.updatePhone(body, this.props.componentId)

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
            <Text style={{ fontSize: 18, color: "#ffffff", fontFamily: "OpenSans" }}>Update phone number</Text>
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
          <View style={{ flex: 0.15 }} />
          <View style={{ flex: 0.7 }}>
            <Text style={{ alignSelf: "center", alignItems: "center", fontSize: 14, color: "#5580A0", fontFamily: "OpenSans-SemiBold" }}>Please enter your new phone number</Text>
          </View>
          <View style={{ flex: 0.15 }} />
        </View>

        <View style={{ flex: 0.08 }} />
        <View style={{ flex: 0.12, flexDirection: "row" }}>
          <View style={{ flex: 0.72 }}>
          </View>
          {this.props.loading ? <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}><ActivityIndicator /></View> : <TouchableOpacity style={{ flex: 0.2, justifyContent: "center" }} onPress={() => { this.PhoneUpdate(this.state.phone) }}>
            <Image source={next_arrow} style={{ flex: 0.7, alignSelf: "center" }} resizeMode="contain" />
          </TouchableOpacity>}
        </View>
      </KeyboardAwareScrollView>

    );
  }
}

const mapStateToProps = ({ app, user, signup, login }) => {
  console.log("user", user)
  return {
    "loading": login.loading,
    "userId": user.userData ? user.userData.data._id : ''
  }
};

const mapDispatchToProps = dispatch => ({
  updatePhone: (data, componentId) => dispatch(AppAction.updatePhone(data, componentId)),
  pop: (componentId) =>
    dispatch(AppAction.pop(componentId)),
  pushTParticulatScreen: (componentId, name) =>
    dispatch(AppAction.pushTParticulatScreen(componentId, name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNumber);

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
