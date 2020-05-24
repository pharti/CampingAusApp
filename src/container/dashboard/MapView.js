import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import * as AppAction from '../../actions';
import Mapview, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import RF from 'react-native-responsive-fontsize';
import {list_View, filtter} from '../../assets/';
import {cordinates} from '../../constants/';
import {SERVER_URL} from '../../constants/';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { fire, doctor, shower, swiming, water, dollar, parking, heart } from "../../assets/index"
let facilititiesIcons = {
    Cafe: fire,
    Wifi: doctor,
    Shower: shower,
    Toilets: swiming,
    Water: water,
    dollar: dollar,
    DumpingPoint: parking
}
import {Checkbox} from 'react-native-ui-lib';
class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flex: 0,
      latitude: cordinates.latitude,
      latitudeDelta: cordinates.latitudeDelta,
      longitude: cordinates.longitude,
      longitudeDelta: cordinates.longitudeDelta,
      modalVisible: false,
      campsites: false,
      toilets: false,
      showers: false,
      picnic: false,
      paidAttractions: false,
      paidCamps: false,
      attractions: false,
    };
    this.siteFilter = this.siteFilter.bind(this);
  }

  componentWillMount() {
    //Re-render the map
    let body = {
      all: true,
    };
    this.props.cordinates(body);
    setTimeout(() => this.setState({flex: 1}), 500);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  siteFilter() {
    this.setState({modalVisible: false});
    console.log('cams------>', this.state.campsites);
    if (
      !this.state.campsites &&
      !this.state.attractions &&
      !this.state.toilets &&
      !this.state.showers &&
      !this.state.picnic &&
      !this.state.paidAttractions &&
      !this.state.paidCamps
    ) {
      body = {
        all: true,
      };
    } else {
      body = {
        campsites: this.state.campsites,
        attractions: this.state.attractions,
        toilets: this.state.toilets,
        showers: this.state.showers,
        picnic: this.state.picnic,
        paidAttractions: this.state.paidAttractions,
        paidCamps: this.state.paidCamps,
      };
    }

    this.props.cordinates(body);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Modal
          //   animationType="slide"s
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.6, backgroundColor: '#FFFFFF'}}>
              {/* <TouchableOpacity style={styles.modalView} onPress={() => { this.setState({ modalVisible: false }) }}>
                                <View style={{ flex: 0.1 }} />
                                <TouchableOpacity style={{ flex: 0.15, justifyContent: "center" }}>
                                 <Checkbox value={true} borderRadius={2} color="#FFA654" />
                                    
                                </TouchableOpacity>
                                <View style={{ flex: 0.1, justifyContent: "center" }}>
                                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: RF(3), color: "#32435F" }}>All</Text>
                                </View>
                            </TouchableOpacity> */}
              <View style={styles.modalView}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.5, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      fontSize: RF(3),
                      color: '#32435F',
                    }}>
                    Campsites
                  </Text>
                </View>
                <View style={{flex: 0.5}} />
                <TouchableOpacity
                  style={{flex: 0.15, justifyContent: 'center'}}>
                  <Checkbox
                    value={this.state.campsites}
                    borderRadius={2}
                    color="#FFA654"
                    onValueChange={value => {
                      this.setState({campsites: value}, () =>
                        this.siteFilter(),
                      );
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.modalView}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.5, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      fontSize: RF(3),
                      color: '#32435F',
                    }}>
                    Paid Campsites
                  </Text>
                </View>
                <View style={{flex: 0.5}} />
                <TouchableOpacity
                  style={{flex: 0.15, justifyContent: 'center'}}>
                  <Checkbox
                    value={this.state.paidCamps}
                    borderRadius={2}
                    color="#FFA654"
                    onValueChange={value => {
                      this.setState({paidCamps: value}, () =>
                        this.siteFilter(),
                      );
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.modalView}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.5, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      fontSize: RF(3),
                      color: '#32435F',
                    }}>
                    Showers
                  </Text>
                </View>
                <View style={{flex: 0.5}} />
                <TouchableOpacity
                  style={{flex: 0.15, justifyContent: 'center'}}>
                  <Checkbox
                    value={this.state.showers}
                    borderRadius={2}
                    color="#FFA654"
                    onValueChange={value => {
                      this.setState({showers: value}, () => this.siteFilter());
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.modalView}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.5, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      fontSize: RF(3),
                      color: '#32435F',
                    }}>
                    Toilets
                  </Text>
                </View>
                <View style={{flex: 0.5}} />
                <TouchableOpacity
                  style={{flex: 0.15, justifyContent: 'center'}}>
                  <Checkbox
                    value={this.state.toilets}
                    borderRadius={2}
                    color="#FFA654"
                    onValueChange={value => {
                      this.setState({toilets: value}, () => this.siteFilter());
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.modalView}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.5, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      fontSize: RF(3),
                      color: '#32435F',
                    }}>
                    BBQ/Picnic
                  </Text>
                </View>
                <View style={{flex: 0.5}} />
                <TouchableOpacity
                  style={{flex: 0.15, justifyContent: 'center'}}>
                  <Checkbox
                    value={this.state.picnic}
                    borderRadius={2}
                    color="#FFA654"
                    onValueChange={value => {
                      this.setState({picnic: value}, () => this.siteFilter());
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.modalView}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.5, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      fontSize: RF(3),
                      color: '#32435F',
                    }}>
                    Attractions
                  </Text>
                </View>
                <View style={{flex: 0.5}} />
                <TouchableOpacity
                  style={{flex: 0.15, justifyContent: 'center'}}>
                  <Checkbox
                    value={this.state.attractions}
                    borderRadius={2}
                    color="#FFA654"
                    onValueChange={value => {
                      this.setState({attractions: value}, () =>
                        this.siteFilter(),
                      );
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.modalView}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.5, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      fontSize: RF(3),
                      color: '#32435F',
                    }}>
                    Paid Attractions
                  </Text>
                </View>
                <View style={{flex: 0.5}} />
                <TouchableOpacity
                  style={{flex: 0.15, justifyContent: 'center'}}>
                  <Checkbox
                    value={this.state.paidAttractions}
                    borderRadius={2}
                    color="#FFA654"
                    onValueChange={value => {
                      this.setState({paidAttractions: value}, () =>
                        this.siteFilter(),
                      );
                    }}
                  />
                </TouchableOpacity>
              </View>

              {/* <TouchableOpacity a ctiveOpacity={5} style={{ flex: 0.2, backgroundColor: "transparent" }} onPress={() => this.setState({ modalVisible: false })}>
                            </TouchableOpacity> */}
              {/* <TouchableOpacity activeOpacity={5} style={{ flex: 0.2, backgroundColor: "transparent" }} onPress={() => this.setState({ modalVisible: false })}>
                            </TouchableOpacity> */}
            </View>
            <TouchableOpacity
              onPress={() => this.setState({modalVisible: false})}
              style={{flex: 0.4, backgroundColor: 'transparent'}}
            />
          </View>
        </Modal>
        {/* Modal closed */}
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.headerContainer}></TouchableOpacity>
          <View
            style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: RF(3)}}>Campgrounds</Text>
          </View>
          {/* <TouchableOpacity style={styles.imgContainer}>
            <Image source={search} style={{ flex: 0.6, }} resizeMode="contain" />
          </TouchableOpacity>*/}
          <TouchableOpacity
            style={styles.imgContainer}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Image source={filtter} style={{flex: 0.6}} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imgContainer}
            onPress={() => {
              this.props.pop(this.props.componentId);
            }}>
            <Image
              source={list_View}
              style={{flex: 0.55}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.9}}>
          <Mapview
            ref={ref => {
              this.map = ref;
            }}
            style={{flex: this.state.flex, width, height}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            zoomEnabled
            zoomControlEnabled
            followsUserLocation={true}
            showsMyLocationButton={true}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta,
            }}>
            {this.props.mapListing.map((marker, i) => {
              // console.log('this.props.mapListing=>>>', this.props.mapListing);
              return (
                <Marker
                  coordinate={{
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude),
                  }}
                  image={{'uri':SERVER_URL+'/'+marker.icon}}
                
                  // image={facilititiesIcons[i]}
                  // style={{ flex: 0.1 }}
                  title={marker.placeName ? marker.placeName : ''}
                  description={marker.description ? marker.description : ''}
                  key={i}
                />
              );
            })}
          </Mapview>
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

    // zIndex: -10,
  },
  categoriesContainer: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: '#5580A0',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    flex: 0.12,
    alignItems: 'center',
  },
  modalView: {
    flex: 0.15,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#32435F',
  },
});
const mapStateToProps = ({campDetailReducer}) => {
  console.log('----------', campDetailReducer);
  return {
    campListing: campDetailReducer.campsiteListing
      ? campDetailReducer.campsiteListing.data
      : [],
    mapListing: campDetailReducer.mapListing
      ? campDetailReducer.mapListing.data
      : [],
    loading: campDetailReducer.isloadig ? campDetailReducer.isloadig : false,
  };
};

const mapDispatchToProps = dispatch => ({
  pop: componentId => dispatch(AppAction.pop(componentId)),
  pushTParticulatScreen: (componentId, name) =>
    dispatch(AppAction.pushTParticulatScreen(componentId, name)),
  cordinates: body => dispatch(AppAction.CordinatesFetch(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
