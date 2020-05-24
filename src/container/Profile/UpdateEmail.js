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
import { invalidEmail, emailReg } from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RF from "react-native-responsive-fontsize"
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import {  Form, Item, Input } from 'native-base';
import {back_arrow,underline,next_arrow} from '../../assets/'


class UpdateEmail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      'visible':false,
      'lengthV':false,
    };
    this.welcome = this.welcome.bind(this)
    this.updateEmail  = this.updateEmail.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }

  welcome() {
    this.props.pop(this.props.componentId);
  }

  updateEmail(email){
    body={
      phone:this.props.phone,
      email:email
    }
    this.props.updateEmail(body,this.props.componentId)
    
  }
  onChangeText = async (key, value) => {
    await this.setState({ [key]: value });
    let { email } = this.state; 
    if (email &&  emailReg.test(email))
      this.setState({ valid: true, emailError: "" });
    else {
      if (key === "email" && !emailReg.test(email))
        this.setState({ emailError: invalidEmail });
      else this.setState({ emailError: ""});
      this.setState({valid:false})
    }
  };

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
            <Text style={{ fontSize: 18, color: "#ffffff", fontFamily: "OpenSans" }}>Update Email</Text>
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
                <Input placeholder="Email" placeholderTextColor="#687C9E" style={{ backgroundColor: "#3C5275", height: 60, borderBottomColor: "#3C5275", borderBottomWidth: 0, fontFamily: "OpenSans-SemiBold",color:"#FFFFFF",paddingLeft:RF(5) }}  onChangeText = {(email)=>{this.setState({'email':email}); this.onChangeText("email", email)}}/>
              </Item>
             
              {this.state.emailError?<Text style={styles.errorTexts} >{this.state.emailError}</Text>:null}
            </Form>
          </View>

        </View>

        <View style={{ flex: 0.1, flexDirection: "row" }}>
          <View style={{ flex: 0.2 }} />
          <View style={{ flex: 0.6 }}>
            <Text style={{ alignSelf: "center", alignItems: "center", fontSize: 14,  color: "#5580A0", fontFamily: "OpenSans-SemiBold" }}>Please enter your new Email</Text>
            
          </View>
          <View style={{ flex: 0.2 }} />
        </View>

        <View style={{ flex: 0.08 }} />
        <View style={{ flex: 0.12, flexDirection: "row" }}>
          <View style={{ flex: 0.72 }}>
          </View>
          {this.props.loading?<View style={{flex:0.2,justifyContent:"center",alignItems:"center"}}><ActivityIndicator/></View>:<TouchableOpacity style={{ flex: 0.2,justifyContent:"center" }} onPress={() => {this.updateEmail(this.state.email)}}>
            <Image source={next_arrow} style={{ flex: 0.7,alignSelf:"center" }} resizeMode="contain" />
          </TouchableOpacity>}
        </View>

        

      </KeyboardAwareScrollView>

    );
  }
}

const mapStateToProps = ({ app, user, signup,login }) => {
  console.log("user",user)
       return {
            "loading":login.loading,
            "phone": user.userData?user.userData.data.phone:''
       }
  };

const mapDispatchToProps = dispatch => ({
  updateEmail: (data,componentId) => dispatch(AppAction.updateEmail(data,componentId)),
  pop: (componentId) =>
    dispatch(AppAction.pop(componentId)),
    pushTParticulatScreen: (componentId, name) =>
    dispatch(AppAction.pushTParticulatScreen(componentId, name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateEmail);

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
