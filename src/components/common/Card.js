
import React from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import RF from "react-native-responsive-fontsize";
import StarRating from 'react-native-star-rating';
import { TouchableOpacity } from "react-native-ui-lib";
import * as AppAction from "../../actions";
import {
    SERVER_URL,
  } from "../../constants/";
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
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 3.5
        }
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    detail(itemDetail) {
        this.props.campDetail(itemDetail);
        this.props.pushTParticulatScreen('Home', 'Detail')
    }
    render() {
        let { placeName, rating, facilities,icon,price,distance } = this.props.item;
        console.log("ImageURl",SERVER_URL+'/'+icon)
        let {
            container,
            campgroundsContainer,
            firstRowContainer,
            firstRowText,
            secondRowText,
            secondRowContainer } = styles;
            console.log("Item=<<>>>>>>>>>>>>>>",this.props.item)
        return (
            <TouchableOpacity style={container} onPress={() => this.detail(this.props.item)}>
                {/* FIRST COLUMN */}
              
                <View style={{ flex: 0.2, alignItems: "center" }}>
                    <View style={{ flex: 0.8, justifyContent: "center" }}>
                        <View style={campgroundsContainer}>
                        <Image
                                source={{'uri':SERVER_URL+'/'+icon}}
                                style={{ flex: 0.7 }}
                                resizeMode="contain" />
                        </View>
                    </View>
                    <View style={{ flex: 0.6 }}></View>
                </View>

                {/* SECOND COLUMN */}
                <View style={{ flex: 0.8}}>
                    {/* FIRST ROW */}
                    <View style={firstRowContainer}>
                        <View style={{ flex: 0.8 }}>
                            <Text
                                style={{ color: "#fff", fontSize: RF(2.2), fontFamily: "OpenSans-SemiBold" }}>{placeName}
                            </Text>
                        </View>
                        <View style={{ flex: 0.2, flexDirection: "row", fontFamily: "OpenSans-SemiBold" }}>
                            <Text style={[{ fontSize: RF(2) }, firstRowText]}>{price&&price!=="undefined"?'$':''}</Text>
                            <Text
                                style={[{ fontSize: RF(2.5) }, firstRowText]}>
                                {price&&price!=="undefined"?price:''}
                            </Text>
                        </View>
                    </View>
                    {/* SECOND ROW */}
                    <View style={secondRowContainer}>
                        <View style={{ flex: 0.45 }}>
                            <Text style={secondRowText}>{distance}</Text>
                        </View>
                        <View style={{ flex: 0.1, alignItems: "center" }}>
                            <Text style={secondRowText}>|</Text>
                        </View>
                        <View style={{ flex: 0.4 }}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={rating}
                                starSize={16}
                                fullStarColor={'#FFA654'}
                                emptyStarColor={"#5580A0"}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                    </View>
                    {/* THIRD ROW */}
                    <View style={{ flex: 0.4 }}>
                        <FlatList
                            data={facilities}
                            horizontal
                            renderItem={({ item }) =>
                                <View style={{ flex: 1, paddingVertical: 10, }}>
                                    <Image
                                        source={facilititiesIcons[item]}
                                        style={{ flex: 1, }}
                                        resizeMode="contain" />
                                </View>
                            }
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
function mapStateToProps(state) {
    return {};
}
const mapDispatchToProps = dispatch => ({
    campDetail: (data) => dispatch(AppAction.campDetail(data)),
    pushTParticulatScreen: (componentId, name) =>
        dispatch(AppAction.pushTParticulatScreen(componentId, name)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#3D5171", flexDirection: "row", height: 150 },
    campgroundsContainer: {
        backgroundColor: "#32435F",
        flex: 0.6,
        borderRadius: 50,
        width: RF(7),
        justifyContent:"center"
    },
    firstRowContainer: {
        flex: 0.3,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    firstRowText: {
        color: "#FFA654", fontFamily: "OpenSans-SemiBold"
    },
    secondRowText: {
        color: "#BDBDBF", fontFamily: "OpenSans-SemiBold"
    },
    secondRowContainer: { flex: 0.2, flexDirection: "row", alignItems: "center" }
});
