import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RF from "react-native-responsive-fontsize";
import * as AppAction from "../../actions";
import {List} from '../../components/'


class FavPlace extends React.Component {
  static options(passProps) {
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: "Discover Holiday Camp",
          dollars: 16,
          howFar: 123,
          direction: "NE",
          rating: 4,
          facilitities: [
            "fire",
            "doctor",
            "shower",
            "swiming",
            "water",
            "dollar",
            "parking"
          ]
        },
        {
          title: "Discover Holiday Camp",
          dollars: 11,
          howFar: 13,
          direction: "NE",
          rating: 2,
          facilitities: ["fire", "doctor", "dollar", "parking"]
        },
        {
          title: "Discover Holiday Camp",
          dollars: 13,
          howFar: 145,
          direction: "NE",
          rating: 1,
          facilitities: [
            "fire",
            "doctor",
            "shower",
            "swiming",
            "water",
            "parking"
          ]
        },
        {
          title: "Discover Holiday Camp",
          dollars: 12,
          howFar: 134,
          direction: "NE",
          rating: 5,
          facilitities: [
            "fire",
            "doctor",
            "shower",
            "water",
            "dollar",
            "parking"
          ]
        },
        {
          title: "Discover Holiday Camp",
          dollars: 17,
          howFar: 189,
          direction: "NE",
          rating: 0.5,
          facilitities: [
            "fire",
            "doctor",
            "shower",
            "swiming",
            "water",
            "parking"
          ]
        }
      ],
      title: "Favourite Places"
    };
    this.isSideDrawerVisible = false;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#32435F"
        }}
      >
        <View style={styles.categoriesContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{ color: "#fff", fontSize: RF(3), textAlign: "center" }}
            >
              {this.state.title}
            </Text>
          </View>
        </View>
        <View style={{ flex: 0.9, backgroundColor: "#32435F" }}>
          <List data={this.state.list} title={this.state.title} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  tabBar: {
    flexDirection: "row"

    // paddingTop: Constants.statusBarHeight,
  },
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
    alignItems: "center",
    backgroundColor: "transparent"
  }
  // tabItem: {

  // },
});

const mapStateToProps = ({ app, user, login }) => ({
  app,
  user,
  login
});
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(AppAction.logout()),
  AppAction: bindActionCreators(AppAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavPlace);
