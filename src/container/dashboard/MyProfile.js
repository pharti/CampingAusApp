import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AppAction from '../../actions';
import {notification, settings, help, slider} from '../../assets';
import {Avatar} from 'react-native-ui-lib';
import {SERVER_URL} from '../../constants/url';

class MyProfile extends React.Component {
  static options(passProps) {
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.logOut = this.logOut.bind(this);
    this.userProfile = this.userProfile.bind(this);
  }

  logOut() {
    Alert.alert(
      'Camping Australia',
      'Are you sure you want to logout ?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            this.props.logOut(this.props.type);
          },
        },
      ],
      {cancelable: false},
    );
  }

  userProfile() {
    this.props.pushTParticulatScreen('Home', 'UserProfile');
  }

  componentDidMount=()=>
  {
    console.log("props Profile=>>",this.props)
  }
  render() {
    let firstName = this.props.firstName;
    let lastName = this.props.lastName;
    return (
      <View style={{flex: 1, backgroundColor: '#32435F'}}>
        <View style={{flex: 0.1}} />
        <TouchableOpacity
          style={{flex: 0.1, flexDirection: 'row'}}
          onPress={() => this.userProfile()}>
          <View style={{flex: 0.1}} />
          <View style={{flex: 0.2}}>
            <Avatar
              imageSource={
                this.props.image
                  ? {uri: SERVER_URL + '/' + this.props.image}
                  : slider
              }
              imageStyle={{flex: 1}}
              size={70}
            />
          </View>
          <View
            style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 26,
                fontFamily: 'OpenSans-SemiBold',
                alignSelf: 'flex-start',
                color: '#FFF',
              }}>
              {firstName} {lastName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'OpenSans-SemiBold',
                alignSelf: 'flex-start',
                color: '#8E9CB4',
              }}>
              View and edit profile
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 0.05}} />
        <View style={{flex: 0.4, flexDirection: 'row'}}>
          <View style={{flex: 0.1}} />
          <View style={{flex: 0.8, flexDirection: 'column'}}>
            <View style={styles.menu}>
              <View style={{flex: 0.5}}>
                <Text style={styles.menuText}>Notifications </Text>
              </View>
              <View style={{flex: 0.4}} />
              <View style={{flex: 0.1}}>
                <Image
                  source={notification}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.menu}>
              <View style={{flex: 0.5}}>
                <Text style={styles.menuText}>Settings </Text>
              </View>
              <View style={{flex: 0.4}} />
              <View style={{flex: 0.1}}>
                <Image
                  source={settings}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.menu}>
              <View style={{flex: 0.5}}>
                <Text style={styles.menuText}>Get help </Text>
              </View>
              <View style={{flex: 0.4}} />
              <View style={{flex: 0.1}}>
                <Image
                  source={help}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 0.05}} />

        <View style={{flex: 0.1, flexDirection: 'row'}}>
          <View style={{flex: 0.2}} />
          <TouchableOpacity
            style={{
              flex: 0.6,
              borderWidth: 2,
              borderColor: '#FFA654',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.logOut()}>
            <Text
              style={{
                fontSize: 26,
                color: '#FFA654',
                alignSelf: 'center',
                fontFamily: 'OpenSans-SemiBold',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
          <View style={{flex: 0.2}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  menu: {
    flex: 0.3,
    borderBottomWidth: 1,
    borderBottomColor: '#8E9CB4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'OpenSans-SemiBold',
  },
  menuIcon: {
    flex: 0.4,
  },
});

const mapStateToProps = ({user}) => {
  console.log('user------------->', user);
  return {
    firstName:
      user.userData && user.userData.data ? user.userData.data.firstName : '',
    lastName:
      user.userData && user.userData.data ? user.userData.data.lastName : '',
    image: user.userData && user.userData.data ? user.userData.data.image : '',
    type:
      user.userData && user.userData.data ? user.userData.data.loginType : '',
  };
};
const mapDispatchToProps = dispatch => ({
  logOut: type => dispatch(AppAction.logout(type)),
  AppAction: bindActionCreators(AppAction, dispatch),
  pushTParticulatScreen: (componentId, name) =>
    dispatch(AppAction.pushTParticulatScreen(componentId, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
