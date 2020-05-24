import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RF from 'react-native-responsive-fontsize';
import {
  TabView,
  SceneMap,
  TabBar,
} from '../../../modefied_modules/react-native-tab-view';
import FIcon from 'react-native-vector-icons/FontAwesome5';
// import {Icon }  from "native-base";
import * as AppAction from '../../actions';
import MyProfile from './MyProfile';
import CategoryListing from './CategoryListing';
import {routes} from '../../constants/';
import {
  moderateScale,
  scale,
  verticalScale,
  horizontalScale,
  ScaledSheet,
} from 'react-native-size-matters';
// import Icon from "react-native-vector-icons/MaterialIcons";

import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
} from 'native-base';

const FirstRoute = props => <CategoryListing {...props} />;

//"phase 2" const SecondRoute = () => (
//   <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#32435F"}}><Text style={{fontSize:26}}>Under Development</Text></View>
// );

const SecondRoute = props => {
  console.log('AlllPropsss=>>>', props);
  props.jumpTo('Profile');
  return <MyProfile {...props} />;
};

const renderIcon = props => {
  console.log('console route=>>', props);
  const {route} = props;
  let iconColor = '#c2c3c8';
  return (
    <Icon
      name={route.key === 'first' ? 'place' : 'person'}
      size={moderateScale(22)}
      color={iconColor}
    />
  );
};
class Home extends React.Component {
  static options(passProps) {
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: routes,
    };
    this._renderTabBar = this._renderTabBar.bind(this);
  }

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    let {index} = this.state;
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? '#FFFFFF' : '#FFFFFF',
            ),
          });
          let colorCode = index === i ? '#FFA654' : 'transparent';

          return (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                borderBottomWidth: 2,
                borderBottomColor: colorCode,
                backgroundColor: '#5580A0',
                flexDirection: 'row',
              }}
              onPress={() => {
                this.setState({index: i});
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRightColor: '#fff',
                  borderLeftColor: '#fff',
                  borderRightWidth: route.key === 'second' ? 0.5 : 0,
                  borderLeftWidth: route.key === 'second' ? 0.5 : 0,
                }}>
                <Animated.Image source={route.home} resizeMode="contain" />
                <Animated.Text
                  style={{
                    color,
                    alignSelf: 'center',
                    padding: RF(0.5),
                    fontSize: 13,
                  }}>
                  {route.title}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  render() {
    let {index} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.92}}>
          {index === 1 ? <MyProfile /> : <CategoryListing />}
        </View>

        <Footer
          style={{
            backgroundColor: '#FFFFFF',
            flex: 0.08,
          }}>
          <FooterTab
            style={{
              backgroundColor: '#5580A0',
              paddingHorizontal: moderateScale(10),
            }}>
            <View
              style={{
                flex: 1,
                borderTopWidth: index === 0 ? 3 : 0,
                borderColor: '#FFFFFF',
              }}>
              <Button
                vertical
                active={index === 0 ? true : false}
                onPress={() => this.setState({index: 0})}
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#FFFFFF',
                }}>
                <FIcon
                  name="map-marked-alt"
                  size={moderateScale(21)}
                  style={{
                    color: index === 0 ? '#FFFFFF' : 'rgba(0,0,0,0.7)',
                    marginBottom: moderateScale(5),
                  }}
                />
                <Text
                  style={{
                    color: index === 0 ? '#FFFFFF' : 'rgba(0,0,0,0.7)',
                    fontSize: moderateScale(12),
                    fontWeight: index === 0 ? 'bold' : 'normal',
                  }}>
                  Find Place
                </Text>
              </Button>
            </View>

            <View
              style={{
                borderRightWidth: 0.5,
                marginVertical: moderateScale(10),
                borderColor: '#D8D8D8',
              }}
            />
            <View
              style={{
                flex: 1,
                borderTopWidth: index === 1 ? 3 : 0,
                borderColor: '#FFFFFF',
              }}>
              <Button
                vertical
                active={index === 1 ? true : false}
                onPress={() => this.setState({index: 1})}
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#FFA654',
                }}>
                <Icon
                  name="person"
                  size={moderateScale(21)}
                  style={{color: index === 1 ? '#FFFFFF' : 'rgba(0,0,0,0.7)'}}
                />
                <Text
                  style={{
                    color: index === 1 ? '#FFFFFF' : 'rgba(0,0,0,0.7)',
                    fontSize: moderateScale(12),
                    fontWeight: index === 1 ? 'bold' : 'normal',
                  }}>
                  Profile
                </Text>
              </Button>
            </View>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  tabBar: {
    flex: 0.08,
    flexDirection: 'row',
  },
});

const mapStateToProps = ({app, user, login}) => ({
  app,
  user,
  login,
});
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(AppAction.logout()),
  AppAction: bindActionCreators(AppAction, dispatch),
  pushTParticulatScreen: (componentId, name) =>
    dispatch(AppAction.pushTParticulatScreen(componentId, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
