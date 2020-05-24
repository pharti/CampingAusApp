import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RF from 'react-native-responsive-fontsize';
import * as AppAction from '../../actions';
import {categoriesData} from '../../constants';
import {logo} from '../../assets';
import {Body} from 'native-base';
class CategoryList extends React.Component {
  static options(passProps) {
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.isSideDrawerVisible = false;
    this.categories = this.categories.bind(this);
  }

  categories(type) {
    body = {
      userId: this.props.userId,
    };
    console.log('body=====>', body);
    let category = 'listing';
    this.props.campList(type, body, category);
  }

  // componentDidMount=()=>
  // {
  //   console.log("props category=>>",this.props)
  // }
  render() {
   
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#32435F'}}>
        <View style={{flex: 0.1, flexDirection: 'row'}}>
          <View style={{flex: 0.4}}>
            <Image
              source={logo}
              resizeMode="contain"
              style={{flex: 15, alignSelf: 'flex-end'}}
            />
          </View>
          <View
            style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  alignSelf: 'center',
                  fontFamily: 'OpenSans-SemiBold',
                }}>
                Camps Aus
              </Text>
            </View>
          </View>
          <View style={{flex: 0.3}} />
        </View>

        <View style={{flex: 0.9}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={categoriesData}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{height: 160}}
                onPress={() => this.categories(item.type)}>
                <ImageBackground
                  source={item.image}
                  style={{flex: 0.95, marginHorizontal: RF(1)}}
                  resizeMode="contain">
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'center',
                      marginTop: RF(16),
                      color: '#FFFFFF',
                    }}>
                    {item.name}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
        <Modal
          visible={this.props.loading}
          transparent={true}
          onRequestClose={() => {}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <ActivityIndicator color="white" size="large" />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  tabBar: {
    flexDirection: 'row',
  },
});

const mapStateToProps = ({app, user, campDetailReducer}) => {
  return {
    userId: user.userData ? user.userData.data._id : '',
    loading: campDetailReducer.isloadig ? campDetailReducer.isloadig : false,
  };
};

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(AppAction.logout()),
  AppAction: bindActionCreators(AppAction, dispatch),
  pushTParticulatScreen: (componentId, name) =>
    dispatch(AppAction.pushTParticulatScreen(componentId, name)),
  campList: (type, body, category) =>
    dispatch(AppAction.campsitesList(type, body, category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
