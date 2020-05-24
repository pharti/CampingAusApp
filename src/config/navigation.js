/*
 * @file: Navigation.js
 * @description: Contains the navigation Stacks.
 * @date: 9.Oct.2018
 * @author: Rishabh Gupta
 * */

import { Navigation } from "react-native-navigation";

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "Welcome",
              options: {
                statusBar: {
                  style: "dark",
                  backgroundColor: "#FFFFFF"
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                }
              }
            }
          }
        ]
      }
    }
  });

export const goHome = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "Home",
        children: [
          {
            component: {
              name: "Home",
              passProps: {
                text: "React Native"
              },
              options: {
                statusBar: {
                  style: "dark",
                  backgroundColor: "#FFFFFF"
                },
                topBar: {
                  hideOnScroll: false,
                  drawBehind: true,
                  visible: false,
                  animate: false
                }
              }
            }
          }
        ]
      }
    }
  });
