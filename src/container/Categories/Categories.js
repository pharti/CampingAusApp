
import React from "react";
import { View, StyleSheet, Text, Image, Modal, TextInput, Animated,ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import RF from "react-native-responsive-fontsize"
import * as AppAction from "../../actions";
import {List} from '../../components/'
import { TouchableOpacity } from "react-native-ui-lib";
import { filtter, more, name, price, distance } from '../../assets/'
import {back_arrow,search,map,search_act} from '../../assets/'
class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Campgrounds",
            modalVisible: false,
            searchBarShow: false,
            search: ''
        }
        this.map = this.map.bind(this)
        this.searchData = this.searchData.bind(this)
        this.filterByName = this.filterByName.bind(this)
        this.filterByDistance = this.filterByDistance.bind(this)
        this.AllData = this.AllData.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)

    }

    map() {
        this.props.pushTParticulatScreen(this.props.componentId, 'MapView')
    }
    searchData() {
        let type = this.props.type
        body = {
            'userId':this.props.userId,
            'searchKey':this.state.search
        }
        let category = "searching"

        this.props.campList(type,body,category)
    }
    filterByName() {
        let type = this.props.type
        body = {
            'userId':this.props.userId,
            'sortByName':"1"
        }
        let category = "searching"

        this.props.campList(type,body,category)
    }
    filterByDistance() {
        console.log("distance")
    }
    AllData() {
        let type = this.props.type
        body = {
            'userId':this.props.userId
        }
        let category = "searching"

        this.props.campList(type,body,category)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        let { imgContainer, categoriesContainer, headerContainer } = styles;
        return (
            <View style={{ flex: 1, backgroundColor: "#32435F" }}>
                <Modal
                    //   animationType="slide"s
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.4, backgroundColor: "#FFFFFF" }}>
                            <TouchableOpacity style={styles.modalView} onPress={() => { this.setState({ modalVisible: false }); this.AllData() }}>
                                <View style={{ flex: 0.1 }} />
                                <TouchableOpacity style={{ flex: 0.15, justifyContent: "center" }}>
                                    <Image source={more} style={{ flex: 0.4, alignSelf: "center" }} resizeMode="contain" />
                                </TouchableOpacity>
                                <View style={{ flex: 0.1, justifyContent: "center" }}>
                                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: RF(3), color: "#32435F" }}>All</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalView} onPress={() => { this.setState({ modalVisible: false }); this.filterByName() }}>
                                <View style={{ flex: 0.1 }} />
                                <TouchableOpacity style={{ flex: 0.15, justifyContent: "center" }}>
                                    <Image source={name} style={{ flex: 0.4, alignSelf: "center" }} resizeMode="contain" />
                                </TouchableOpacity>
                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: RF(3), color: "#32435F" }}>Name</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalView} onPress={() => { this.setState({ modalVisible: false }); this.filterByDistance() }}>
                                <View style={{ flex: 0.1 }} />
                                <TouchableOpacity style={{ flex: 0.15, justifyContent: "center" }}>
                                    <Image source={distance} style={{ flex: 0.4, alignSelf: "center" }} resizeMode="contain" />
                                </TouchableOpacity>
                                <View style={{ flex: 0.3, justifyContent: "center" }}>
                                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: RF(3), color: "#32435F" }}>Distance</Text>
                                </View>
                            </TouchableOpacity>

                            {/*  "in phase 2" <TouchableOpacity style={styles.modalView}>
                                <View style={{ flex: 0.1 }} />
                                <TouchableOpacity style={{ flex: 0.15, justifyContent: "center" }}>
                                    <Image source={price} style={{ flex: 0.4, alignSelf: "center" }} resizeMode="contain" />
                                </TouchableOpacity>
                                <View style={{ flex: 0.3, justifyContent: "center" }}>
                                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: RF(3), color: "#32435F" }}>Price</Text>
                                </View>
                            </TouchableOpacity> */}
                            {/* <TouchableOpacity activeOpacity={5} style={{ flex: 0.2, backgroundColor: "transparent" }} onPress={() => this.setState({ modalVisible: false })}>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={5} style={{ flex: 0.2, backgroundColor: "transparent" }} onPress={() => this.setState({ modalVisible: false })}>
                            </TouchableOpacity> */}
                        </View>
                        <TouchableOpacity

                            onPress={() => this.setState({ modalVisible: false })}
                            style={{ flex: 0.6, backgroundColor: "transparent" }}
                        />
                    </View>
                </Modal>
                {/* Modal closed */}
                {this.state.searchBarShow ? <Animated.View style={categoriesContainer}>
                    <TouchableOpacity style={headerContainer} onPress={() => this.setState({ searchBarShow: false })}>
                        <Image source={back_arrow} style={{ flex: 0.6, }} resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={{ flex: 0.7 }} >
                        <TextInput placeholder="Search by name" underlineColorAndroid="#5580A0" placeholderTextColor="#FFFFFF" style={{ fontSize: 18, color: "#FFFFFF", fontFamily: "OpenSans-SemiBold" }} onChangeText={(value) => this.setState({ 'search': value })} />
                    </View>
                    <TouchableOpacity style={imgContainer} onPress={() => this.searchData()}>
                        <Image source={search_act} style={{ flex: 0.6, }} resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={{ flex: 0.1 }}>
                    </View>
                </Animated.View> :
                    <View style={categoriesContainer}>
                        <TouchableOpacity style={headerContainer} onPress={() => { this.props.pop(this.props.componentId); }}>
                            <Image source={back_arrow} style={{ flex: 0.6, }} resizeMode="contain" />
                        </TouchableOpacity>
                        <View style={{ flex: 0.4, }}>
                            <Text style={{ color: "#fff", fontSize: RF(3) }}>{this.state.title}</Text>
                        </View>
                        <TouchableOpacity style={imgContainer} onPress={() => this.setState({ searchBarShow: true })}>
                            <Image source={search} style={{ flex: 0.6, }} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity style={imgContainer} onPress={() => { this.setModalVisible(true); }}>
                            <Image source={filtter} style={{ flex: 0.6, alignSelf: "center" }} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity style={imgContainer} onPress={() => this.map()}>
                            <Image source={map} style={{ flex: 0.6, }} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                }

                <View style={{ flex: 0.9, backgroundColor: "#32435F" }}>
                    {this.props.loading?<View style={{flex: 0.9,justifyContent:"center",alignItems:"center"}}><ActivityIndicator/></View>:<List data={this.props.campListing} />}
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    categoriesContainer: {
        flex: 0.1,
        flexDirection: "row",
        backgroundColor: "#5580A0",
        alignItems: "center"
    },
    headerContainer: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    imgContainer: {
        flex: 0.12,
        alignItems: "center"
    },
    modalView: {
        flex: 0.33,
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "#32435F"
    }
});
const mapStateToProps = ({ app, user, signup, login, campDetailReducer }) => {
    console.log("user-------->", campDetailReducer)
    return {
        "userId": user.userData ? user.userData.data._id : '',
        "campListing": campDetailReducer.campsiteListing ? campDetailReducer.campsiteListing.data : [],
        "type": campDetailReducer.listingType?campDetailReducer.listingType:'Campsites',
        "loading":campDetailReducer.isloadig?campDetailReducer.isloadig:false
    }
};
const mapDispatchToProps = (dispatch) => ({
    pop: (componentId) => dispatch(AppAction.pop(componentId)),
    pushTParticulatScreen: (componentId, name) => dispatch(AppAction.pushTParticulatScreen(componentId, name)),
    campList: (type,body,category) => dispatch(AppAction.campsitesList(type,body,category)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories);


