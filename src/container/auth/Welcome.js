import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Swiper from '../../../modefied_modules/react-native-swiper';
import * as AppAction from '../../actions';
import {getLocation, getToken} from '../../utilities/';
import RF from 'react-native-responsive-fontsize';
import {ScaledSheet} from 'react-native-size-matters';
import {
  back_arrow,
  underline,
  next_arrow,
  slider,
  facebook,
  google,
} from '../../assets/';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {debounce, _} from 'lodash';
import firebase from 'react-native-firebase';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#32435F',
  },
  image: {
    width: 100,
    height: 100,
  },

  slide: {
    flex: 0.6,
  },
});

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      token: '',
      loading: false,
    };
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    getLocation((err, res) => {
      console.log('res res ', err, res);
    });

    let googleKey =
      Platform.OS === 'ios'
        ? '370213450993-at1lh5j3usvonrca2nmkeh6i2dkqeb4k.apps.googleusercontent.com'
        : '370213450993-ej7ba9vhiqa8pt2g8euch706uj7m8rpv.apps.googleusercontent.com';
    GoogleSignin.configure({
      // scopes: ['email', 'profile'],
      webClientId: googleKey,
      offlineAccess: true,
      iosClientId: googleKey,
      // iosClientId:"370213450993-at1lh5j3usvonrca2nmkeh6i2dkqeb4k.apps.googleusercontent.com"
    });
  }

  socialLogin(value) {
    this.setState({loading: true});
    getLocation((err, res) => {
      console.log('res res ', err, res);
      if (res) {
        this.setState({location: res, loading: false});
        let body = {
          latitude: this.state.location
            ? this.state.location.coords.latitude
              ? this.state.location.coords.latitude
              : ''
            : '',
          longitude: this.state.location
            ? this.state.location.coords.longitude
              ? this.state.location.coords.longitude
              : ''
            : '',
          deviceToken: this.state.token ? this.state.token : '',
        };
        if (value === 'fb') this.props.loginWithFb(body);
        if (value === 'google') {
          this.props.loginWithGoogle(body);
        }
      } else {
        alert('We are unable to find your location');
        this.setState({location: '', loading: false});
      }
    });
  }

  signIn() {
    this.props.pushTParticulatScreen(this.props.componentId, 'NumberSignin');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 0.05}} />
        <View style={{flex: 0.55}}>
          <Swiper activeDotColor="#FFFFFF" dotColor="#5c7798">
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex: 0.5}}>
                <Image
                  source={slider}
                  style={{flex: 0.9}}
                  resizeMode="contain"
                />
              </View>

              <View
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    color: '#ffffff',
                    fontStyle: 'normal',
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  Pack your bag
                </Text>
              </View>
              <View style={{flex: 0.15, flexDirection: 'row'}}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.8, alignSelf: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#5580A0',
                      fontFamily: 'OpenSans-SemiBold',
                    }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <View style={{flex: 0.1}} />
              </View>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex: 0.5}}>
                <Image
                  source={slider}
                  style={{flex: 0.9}}
                  resizeMode="contain"
                />
              </View>

              <View
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    color: '#ffffff',
                    fontStyle: 'normal',
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  Pack your bag
                </Text>
              </View>
              <View style={{flex: 0.15, flexDirection: 'row'}}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.8, alignSelf: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#5580A0',
                      fontFamily: 'OpenSans-SemiBold',
                    }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <View style={{flex: 0.1}} />
              </View>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex: 0.5}}>
                <Image
                  source={slider}
                  style={{flex: 0.9}}
                  resizeMode="contain"
                />
              </View>

              <View
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    color: '#ffffff',
                    fontStyle: 'normal',
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  Pack your bag
                </Text>
              </View>
              <View style={{flex: 0.15, flexDirection: 'row'}}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.8, alignSelf: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#5580A0',
                      fontFamily: 'OpenSans-SemiBold',
                    }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <View style={{flex: 0.1}} />
              </View>
            </View>
          </Swiper>
        </View>
        <View style={{flex: 0.4}}>
          <View style={{flex: 0.03}} />
          <View style={{flex: 0.17, flexDirection: 'row'}}>
            <View style={{flex: 0.1}} />
            <TouchableOpacity
              style={{
                flex: 0.8,
                backgroundColor: '#54E2FF',
                borderRadius: 5,
                flexDirection: 'row',
              }}
              onPress={() => this.socialLogin('fb')}>
              <View
                style={{
                  flex: 0.25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={facebook}
                  style={{flex: 0.5, marginLeft: RF(4)}}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  flex: 0.6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#32435F',
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  Continue with facebook
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{flex: 0.1}} />
          </View>
          <View style={{flex: 0.04}} />
          <View style={{flex: 0.17, flexDirection: 'row'}}>
            <View style={{flex: 0.1}} />
            <TouchableOpacity
              style={{
                flex: 0.8,
                backgroundColor: '#FF7464',
                borderRadius: 5,
                flexDirection: 'row',
              }}
              onPress={() => this.socialLogin('google')}>
              <View
                style={{
                  flex: 0.25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={google}
                  style={{flex: 0.45, marginLeft: RF(6)}}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  flex: 0.55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#32435F',
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  Continue with google
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{flex: 0.1}} />
          </View>
          <View style={{flex: 0.04}} />
          <View style={{flex: 0.17, flexDirection: 'row'}}>
            <View style={{flex: 0.1}} />
            <TouchableOpacity
              style={{
                flex: 0.8,
                backgroundColor: '#FFFFFF',
                borderRadius: 5,
                flexDirection: 'row',
              }}
              onPress={_.debounce(() => this.signIn(), 500)}>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{
                  flex: 0.6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#32435F',
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  Continue with number
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{flex: 0.1}} />
          </View>
        </View>
        <Modal
          visible={this.state.loading}
          onRequestClose={() => {}}
          transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <ActivityIndicator color="white" size="large" />
            <Text style={{fontSize: 16, color: '#FFFFFF'}}>
              Fetching your location
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    user: user,
  };
};

const mapDispatchToProps = dispatch => ({
  pushTParticulatScreen: (componentId, name) =>
    dispatch(AppAction.pushTParticulatScreen(componentId, name)),
  loginWithFb: data => dispatch(AppAction.loginWithFb(data)),
  loginWithGoogle: data => dispatch(AppAction.googleLoginAction(data)),
  loginWithGoogleIos: data => dispatch(AppAction.googleLoginActionIos(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
