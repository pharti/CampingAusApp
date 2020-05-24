import NetInfo from '@react-native-community/netinfo';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const getLocation = async cb => {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 23) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          // {
          //   'title': 'Example App',
          //   'message': 'Example App access to your location '
          // }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          Geolocation.getCurrentPosition(
            position => cb(null, position),
            error => cb(error, null),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else if (
          granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
          granted === PermissionsAndroid.RESULTS.DENIED
        )
          Alert.alert(
            'Geolocation Permission Denied',
            "Please change your device's location permission settings in order to use this app",
          );
        else {
          console.log('location permission denied');
          alert('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      Geolocation.getCurrentPosition(
        position => cb(null, position),
        error => {
          cb(error, null);
          Alert.alert(
            error.message,
            "Please change your device's location permission settings in order to use this app",
          );
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }
  }
  // Ios
  else {
    Geolocation.getCurrentPosition(
      position => cb(null, position),
      error => {
        cb(error, null);
        Alert.alert(
          error.message,
          "Please change your device's location permission settings in order to use this app",
        );
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }
};

//   export const getToken  = async ()=> {
//     return await FCM.getFCMToken()
//     // return await token;
//     .then(token => token);
// }

export const network = () => {
  NetInfo.getConnectionInfo().then(connectionInfo => {
    console.log(
      'Initial, type: ' +
        connectionInfo.type +
        ', effectiveType: ' +
        connectionInfo.effectiveType,
    );
    if (connectionInfo.type === 'none') {
      alert('No internet connection');
    }
    if (
      connectionInfo.effectiveType === '2g' ||
      connectionInfo.effectiveType === 'Edge'
    ) {
      alert('Slow internet connection');
    }
  });
  function handleFirstConnectivityChange(connectionInfo) {
    console.log(
      'First change, type: ' +
        connectionInfo.type +
        ', effectiveType: ' +
        connectionInfo.effectiveType,
    );

    NetInfo.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange,
    );
  }
  NetInfo.addEventListener('connectionChange', handleFirstConnectivityChange);
};
