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
import {back_arrow,next_arrow,eye,underline} from '../../assets/'
class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            'password': '',
            'confirmPassword': ''
        };
        this.welcome = this.welcome.bind(this)
        this.password = this.password.bind(this)
    }

    welcome() {
        this.props.pop(this.props.componentId);
    }

    password() {
        let body = {
            'phone': this.props.phone,
            'password': this.state.password,

        }
        this.props.forgotPassword(body)
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
                        <Text style={{ fontSize: 18, fontWeight: '500', color: "#ffffff", fontFamily: "OpenSans" }}>Forgot Password</Text>
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
                    <View style={{ flex: 0.9 }}>
                        <Form>
                            <Item underline={false} style={{ borderBottomColor: "#3C5275", backgroundColor: "#3C5275" }}>
                                <Input placeholder="Password" secureTextEntry={this.state.show} placeholderTextColor="#687C9E" style={{ backgroundColor: "#3C5275", height: 60, borderBottomColor: "#3C5275", borderBottomWidth: 0, fontFamily: "OpenSans-SemiBold", paddingLeft: RF(5), color: "#FFFFFF" }} onChangeText={(password) => this.setState({ 'password': password })} />
                                <TouchableOpacity onPress={() => this.setState({ 'show': false })}>
                                    <Image source={eye} style={{ alignSelf: "center", backgroundColor: "#3C5275", marginRight: RF(2) }} />
                                </TouchableOpacity>

                            </Item>
                            <Item underline={false} style={{ borderBottomColor: "#3C5275", backgroundColor: "#3C5275" }}>
                                <Input placeholder="Confirm Password" secureTextEntry={this.state.show} placeholderTextColor="#687C9E" style={{ backgroundColor: "#3C5275", height: 60, borderBottomColor: "#3C5275", borderBottomWidth: 0, fontFamily: "OpenSans-SemiBold", paddingLeft: RF(5), color: "#FFFFFF" }} onChangeText={(cPassword) => this.setState({ 'confirmPassword': cPassword })} />
                                <TouchableOpacity onPress={() => this.setState({ 'show': false })}>

                                </TouchableOpacity>

                            </Item>
                        </Form>
                    </View>

                </View>

                <View style={{ flex: 0.1, flexDirection: "row" }}>

                </View>


                <View style={{ flex: 0.05 }} />
                <View style={{ flex: 0.12, flexDirection: "row" }}>
                    <View style={{ flex: 0.8 }}>
                    </View>

                    {this.props.loading ? <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}><ActivityIndicator /></View> : <TouchableOpacity style={{ flex: 0.1 }} onPress={() => this.password()}>
                        <Image source={next_arrow} style={{ flex: 0.7, alignSelf: "center" }} resizeMode="contain" />
                    </TouchableOpacity>}
                </View>
            </KeyboardAwareScrollView>

        );
    }
}

const mapStateToProps = ({ app, user, signup, login }) => {
 
    return {
        "loading": login.Floading,
        "phone": user.userData ? user.userData.data.phone : ''
    }
};
const mapDispatchToProps = dispatch => ({
    forgotPassword: (data) => dispatch(forgotPassword(data)),
    pop: (componentId) => dispatch(AppAction.pop(componentId)),
    pushTParticulatScreen: (componentId, name) =>
        dispatch(AppAction.pushTParticulatScreen(componentId, name)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword);

const styles = ScaledSheet.create({
    input: {
        width: scale(300),
        fontSize: RF(2.5),
        fontWeight: "500",
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
        fontWeight: "bold",
        color: "#5cc174"
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
