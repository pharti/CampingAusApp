
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
  Modal,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import RF from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-ui-lib";
import Swiper from "../../../modefied_modules/react-native-swiper";
import * as AppAction from "../../actions";
import StarRating from "react-native-star-rating";
import {
  time,
  back_arrow,
  fire_wht,
  doctor_wht,
  shower_wht,
  swim_wht,
  water_wht,
  dollar_wht,
  parking_wht,
  heart,
  heart_act,
  map,
  detailMap
} from "../../assets/index";
let facilititiesIcons = {
  Cafe: fire_wht,
  Wifi: doctor_wht,
  Shower: shower_wht,
  Toilets: swim_wht,
  Water: water_wht,
  dollar: dollar_wht,
  DumpingPoint: parking_wht
};
import {
  SERVER_URL,
} from "../../constants/";
const { height, width } = Dimensions.get("window");

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      favourite: false
    };
    this.setModalVisible = this.setModalVisible.bind(this)
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {

    let { sliderImgContainer } = styles;
    let { Campimages1, Campimages2, Campimages3, address, contact, country, facilities, placeName, price, rating, description } = this.props.campDetail;
    return (
      <View style={{ flex: 1, backgroundColor: "#32435F" }}>
        {/* MODAL */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{}}>
            <View
              style={{
                backgroundColor: "#32435F",
                paddingTop: 22,
                height: height
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={{ paddingHorizontal: height * 0.05, flex: 0.1 }}
              >
                <Image
                  source={back_arrow}
                  style={{ height: height * 0.1, width: width * 0.1 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 0.9,
                  backgroundColor: "transparent"
                }}
              >
                {/* <Text style={{ color: "#fff", fontSize: RF(4) }}>
                  Give feedback
                </Text> */}
              </View>
            </View>
          </View>
        </Modal>
        {/* HEADER */}
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            backgroundColor: "#5580A0",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.2,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              this.props.pop(this.props.componentId);
            }}
          >
            <Image
              source={back_arrow}
              style={{ flex: 0.6 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flex: 0.8 }}>
            <Text style={{ color: "#fff", fontSize: RF(3) }}>
              Discover Holiday Camp
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignItems: "center"
            }}
            onPress={() => this.setState({ favourite: !this.state.favourite })}
          >
            {/* "in phase 2" {this.state.favourite ? (
              <Image
                source={heart_act}
                style={{ flex: 0.5 }}
                resizeMode="contain"
              />
            ) : (
                <Image
                  source={heart}
                  style={{ flex: 0.5 }}
                  resizeMode="contain"
                />
              )} */}
          </TouchableOpacity>
        </View>
        {/* SWIPER */}

        <View style={{ flex: 0.9 }}>
          <ScrollView>
            <View style={{ height: RF(40) }}>
              <Swiper style={styles.wrapper}>
                <View style={sliderImgContainer}>
                  {Campimages1?<Image
                    source={{ 'uri': SERVER_URL + '/' + Campimages1 }}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                  />:<Text style={{alignSelf:"center",fontSize:16,color:"#FFFFFF"}}>No Image Found</Text>}
                </View>
                <View style={sliderImgContainer}>
                  {Campimages2?<Image
                    source={{ 'uri': SERVER_URL + '/' + Campimages2 }}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                  />:<Text style={{alignSelf:"center",fontSize:16,color:"#FFFFFF"}}>No Image Found</Text>}
                </View>
                <View style={sliderImgContainer}>
                  {Campimages3?<Image
                  
                    source={{ 'uri': SERVER_URL + '/' + Campimages3 }}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                  />:<Text style={{alignSelf:"center",fontSize:16,color:"#FFFFFF"}}>No Image Found</Text>}
                </View>
              </Swiper>
              <View style={{ height: height * .08, width: width * .4, position: 'absolute', backgroundColor: '#FFA654', justifyContent: 'center', alignItems: 'center', bottom: 0, left: 0 }}>
                <Text style={{ color: '#32435F', fontFamily: "OpenSans-SemiBold", fontSize: RF(4), fontWeight: 'bold' }}>{price ? '$' + price : 'Free'}</Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: "#fff",
                  lineHeight: 22,
                  fontFamily: "OpenSans-SemiBold",
                  padding: 10
                }}
              >
                {description ? description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'}
              </Text>
            </View>
            {/* FACILITY */}
            <View style={{ flex: 0.1, padding: 10 }}>
              <Text
                style={{
                  color: "#8E9CB4",
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: RF(3)
                }}
              >
                Facilities
              </Text>
              <View
                style={{ flex: 1 }}
              >
                <FlatList
                  data={facilities}
                  horizontal
                  renderItem={({ item }) => (
                    <View
                      style={{ flex: 1 }}
                    >
                      <Image
                        source={facilititiesIcons[item]}
                        resizeMode="contain"
                        style={{ height: height * 0.1 }}
                      />
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={{ height: RF(20), backgroundColor: "#263651" }}>
              <ImageBackground
                source={detailMap}
                style={{ width: "100%", height: "100%" }}
              >
                <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                  <Text
                    style={{
                      color: "#8E9CB4",
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: RF(3)
                    }}
                  >
                    Location
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "OpenSans-SemiBold",
                        fontSize: RF(2.5)
                      }}
                    >
                      {address}, {country}
                    </Text>
                  </View>

                  {/* <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ padding: 5 }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontFamily: "OpenSans-SemiBold",
                            fontSize: RF(4)
                          }}
                        >
                          205 KM NE
                        </Text>
                      </View>
                    </View>
                  </View> */}
                </View>
              </ImageBackground>
            </View>
            <View style={{ height: RF(20), backgroundColor: "#263651" }}>
              <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                <Text
                  style={{
                    color: "#8E9CB4",
                    fontFamily: "OpenSans-SemiBold",
                    fontSize: RF(3)
                  }}
                >
                  Ratings
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: RF(3)
                    }}
                  >
                    {rating}
                  </Text>
                </View>
                <View style={{ width: RF(15), marginHorizontal: 10 }}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={rating}
                    starSize={15}
                    fullStarColor={"#FFA654"}
                    emptyStarColor={"#5580A0"}
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    {/* "in phase 2" <View style={{ padding: 5 }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "OpenSans-SemiBold",
                          fontSize: RF(2)
                        }}
                      >
                        89 Excellent
                      </Text>
                    </View>
                    <View style={{ padding: 5 }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "OpenSans-SemiBold",
                          fontSize: RF(2)
                        }}
                      >
                        10 Average
                      </Text>
                    </View> */}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    {/* "in phase 2" <View style={{ flex: 0.5, padding: 5 }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "OpenSans-SemiBold",
                          fontSize: RF(2)
                        }}
                      >
                        147 Good
                      </Text>
                    </View>
                    <View style={{ flex: 0.5, padding: 5 }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "OpenSans-SemiBold",
                          fontSize: RF(2)
                        }}
                      >
                        5 Poor
                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </View>
            {/*  "in phase 2" <View style={{ height: RF(40), paddingVertical: 15 }}>
              <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                <Text
                  style={{
                    color: "#8E9CB4",
                    fontFamily: "OpenSans-SemiBold",
                    fontSize: RF(3)
                  }}
                >
                  26 Reviews
                </Text>
              </View>
              <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                <View style={{ flex: 0.2 }}>
                  <View
                    style={{
                      backgroundColor: "#32435F",
                      flex: 1,
                      borderRadius: 50,
                      width: RF(7),
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={require("../../assets/icons/campgrounds.png")}
                      style={{ flex: 0.8 }}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View style={{ flex: 0.6 }}>
                  <View>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "OpenSans-SemiBold",
                        fontSize: RF(3)
                      }}
                    >
                      Scarlett Johans
                    </Text>
                  </View>
                  <View style={{ width: RF(15) }}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={rating}
                      starSize={15}
                      fullStarColor={"#FFA654"}
                      emptyStarColor={"#5580A0"}
                    />
                  </View>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: "#fff",
                    lineHeight: 22,
                    fontFamily: "OpenSans-SemiBold",
                    padding: 10
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </Text>
              </View>
            </View> */}
          </ScrollView>
        </View>
        {/* "in phase 2" <TouchableOpacity
          style={{
            flex: 0.08,
            backgroundColor: "#5580A0",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={{ color: "white" }}>Write a review</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}
function mapStateToProps({ campDetailReducer }) {
  return {
    campDetail: campDetailReducer.campDetail
  };
}
const mapDispatchToProps = dispatch => ({
  pop: componentId => dispatch(AppAction.pop(componentId))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
const styles = StyleSheet.create({
  sliderImgContainer: {
    flex: 1,
    justifyContent: "center",

  }
});
