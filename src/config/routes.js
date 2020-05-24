/*
 * @file: routes.js
 * @description: Contains all routes registered.
 * @date: 9.Oct.2018
 * @author: RISHABH GUPTA
 * */

import { Navigation } from "react-native-navigation";
import {SafeAreaView,StatusBar} from "react-native"
import React from "react";
import { Provider } from "react-redux";

import Welcome from "../container/auth/Welcome";
import MapView from "../container/dashboard/MapView";
import Home from "../container/dashboard/Home";
import NumberSignin from "../container/auth/NumberSignin";
import CompleteProfile from "../container/auth/CompleteProfile";
import EnterPassword from "../container/auth/EnterPassword";
import ForgotPassword from "../container/auth/ForgotPassword";
import OtpVerify from "../container/auth/OtpVerify";
import UserProfile from "../container/Profile/UserProfile";
import UpdateEmail from "../container/Profile/UpdateEmail";
import EditNumber from "../container/Profile/EditNumber";
import Categories from "../container/Categories/Categories";
import Detail from "../container/Categories/Detail";
import MyProfile from '../container/dashboard/MyProfile';
import CategoryListing from '../container/dashboard/CategoryListing'


const SafeViewWrapper = (
  ReduxScreen,
  store,
) => props => {
  let { getState } = store;

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle = "dark-content" hidden = {false}  />
       <ReduxScreen {...props}/>
      </SafeAreaView>
    </Provider>
  );
};



export const registerScreens = (store, Provider) => {
  // Loader Stack





  Navigation.registerComponentWithRedux(
    "Loader",
    () => require("../container/AppContainer").default,
    Provider,
    store
  );
  

  Navigation.registerComponent(
    "MyProfile",
    () =>
    SafeViewWrapper(
      MyProfile,
        store
      ),
    () => MyProfile
  );

  Navigation.registerComponent(
    "CategoryListing",
    () =>
    SafeViewWrapper(
      CategoryListing,
        store
      ),
    () => CategoryListing
  );


  Navigation.registerComponent(
    "Welcome",
    () =>
    SafeViewWrapper(
        Welcome,
        store
      ),
    () => Welcome
  );

  Navigation.registerComponent(
    "Home",
    () =>
    SafeViewWrapper(
      Home,
        store
      ),
    () => Home
  );


  Navigation.registerComponent(
    "MapView",
    () =>
    SafeViewWrapper(
      MapView,
        store
      ),
    () => MapView
  );



  Navigation.registerComponent(
    "NumberSignin",
    () =>
    SafeViewWrapper(
      NumberSignin,
        store
      ),
    () => NumberSignin
  );

  Navigation.registerComponent(
    "CompleteProfile",
    () =>
    SafeViewWrapper(
      CompleteProfile,
        store
      ),
    () => CompleteProfile
  );

  Navigation.registerComponent(
    "EnterPassword",
    () =>
    SafeViewWrapper(
      EnterPassword,
        store
      ),
    () => EnterPassword
  );


  Navigation.registerComponent(
    "UpdateEmail",
    () =>
    SafeViewWrapper(
      UpdateEmail,
        store
      ),
    () => UpdateEmail
  );


  Navigation.registerComponent(
    "UserProfile",
    () =>
    SafeViewWrapper(
      UserProfile,
        store
      ),
    () => UserProfile
  );


  Navigation.registerComponent(
    "OtpVerify",
    () =>
    SafeViewWrapper(
      OtpVerify,
        store
      ),
    () => OtpVerify
  );


  Navigation.registerComponent(
    "ForgotPassword",
    () =>
    SafeViewWrapper(
      ForgotPassword,
        store
      ),
    () => ForgotPassword
  );

  Navigation.registerComponent(
    "Detail",
    () =>
    SafeViewWrapper(
      Detail,
        store
      ),
    () => Detail
  );

  Navigation.registerComponent(
    "Categories",
    () =>
    SafeViewWrapper(
      Categories,
        store
      ),
    () => Categories
  );

  Navigation.registerComponent(
    "EditNumber",
    () =>
    SafeViewWrapper(
      EditNumber,
        store
      ),
    () => EditNumber
  );
  




};


