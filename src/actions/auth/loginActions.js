import {
  SERVER_URL,
  facebookUserApiUrl,
  errorConsts,
  googleApiUrl,
} from '../../constants';

import {Alert, Platform} from 'react-native';
import {goHome, goToAuth} from '../../config/navigation';
import {Request} from '../../utilities';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import * as NavigationOptions from '../app';

const fetchFbProfile = async accessToken => {
  console.log(accessToken);
  try {
    const response = await fetch(`${facebookUserApiUrl}${accessToken}`);
    return response.json();
  } catch (error) {
    return error;
  }
};
export const completeProfile = body => {
  try {
    return async dispatch => {
      dispatch({type: 'PROFILE_REQUEST'});
      const response = await Request({
        url: `${SERVER_URL}/register`,
        body,
        method: 'POST',
      });

      if (response.status === 200) {
        dispatch({type: 'PROFILE_SUCCESS', payload: response});
        dispatch({type: 'LOGIN_SUCCESS', payload: response});
        goHome();
      } else {
        Alert.alert(errorConsts.correctPhone);
        dispatch({type: 'PROFILE_FAIL'});
      }
    };
  } catch (error) {
    Alert.alert('Error', errorConsts.apiError);
    dispatch({type: 'PROFILE_FAIL'});
  }
};

export const login = (body, componentID) => {
  console.log('body', body);
  try {
    return async dispatch => {
      dispatch({type: 'LOGIN_REQUEST'});
      const response = await Request({
        url: `${SERVER_URL}/registerPhone`,
        body,
        method: 'POST',
      });

      if (response.status === 200 && response.data.varifyStatus == false) {
        dispatch({type: 'LOGIN_SUCCESS', payload: response});
        dispatch(
          NavigationOptions.pushTParticulatScreen(componentID, 'OtpVerify'),
        );
      } else if (
        response.status === 200 &&
        response.data.isCompleted == false
      ) {
        dispatch({type: 'LOGIN_SUCCESS', payload: response});
        dispatch(
          NavigationOptions.pushTParticulatScreen(
            componentID,
            'CompleteProfile',
          ),
        );
        Alert.alert('Success', errorConsts.profileComplete);
      } else if (
        response.status === 200 &&
        response.data.varifyStatus == true &&
        response.data.isCompleted == true
      ) {
        dispatch({type: 'PROFILE_SUCCESS', payload: response});
        dispatch({type: 'LOGIN_SUCCESS', payload: response});
        dispatch(
          NavigationOptions.pushTParticulatScreen(componentID, 'EnterPassword'),
        );
      } else {
        Alert.alert('Error', errorConsts.validNumber);
        dispatch({type: 'LOGIN_FAIL'});
      }
    };
  } catch (error) {
    console.log('in loginaction----->');
    Alert.alert('Error', errorConsts.apiError);
    dispatch({type: 'LOGIN_FAIL'});
  }
};

export const otpVerify = (body, componentID) => {
  try {
    return async dispatch => {
      const response = await Request({
        url: `${SERVER_URL}/verify`,
        body,
        method: 'PUT',
      });
      if (response.status === 200) {
        dispatch({type: 'OTP_SUCCESS', payload: response});
        dispatch(
          NavigationOptions.pushTParticulatScreen(
            componentID,
            'CompleteProfile',
          ),
        );
      } else {
        Alert.alert('Error', errorConsts.invalidCode);
        dispatch({type: 'OTP_FAIL'});
      }
    };
  } catch (error) {
    Alert.alert('Error', errorConsts.apiError);
    dispatch({type: 'OTP_FAIL'});
  }
};

export const resendOtp = body => {
  try {
    return async dispatch => {
      const response = await Request({
        url: `${SERVER_URL}/resend`,
        body,
        method: 'PUT',
      });
      if (response.status === 200) {
        Alert.alert('Success', errorConsts.successSend);
      } else {
        Alert.alert('Error', errorConsts.apiError);
        dispatch({type: 'OTP_FAIL'});
      }
    };
  } catch (error) {
    Alert.alert('Error', errorConsts.apiError);
    dispatch({type: 'OTP_FAIL'});
  }
};
export const loginWithFb = data => async dispatch => {
  console.log('here in fb dsfdsf', data);

  try {
    dispatch({type: 'LOGIN_REQUEST'});

    // const result =  LoginManager.getInstance().logInWithReadPermissions(this, Arrays.asList("public_profile"));
    const result = await LoginManager.logInWithPermissions(['email']);
    console.log('dfasfasfaf==========', result);
    const {accessToken} = await AccessToken.getCurrentAccessToken();
    console.log('accessToken------------>', accessToken);
    if (accessToken) {
      const {
        first_name,
        last_name,
        name,
        id,
        email,
        picture,
      } = await fetchFbProfile(accessToken);
      const body = {
        firstName: first_name,
        lastName: last_name,
        name,
        facebookId: id,
        picture,
        email,
        type: 'facebook',
        facebook_token: accessToken,
        latitude: data.latitude ? data.latitude : '',
        longitude: data.longitude ? data.longitude : '',
        deviceToken: data.deviceToken,
      };
      console.log('body--------------=', body);
      const loginResponse = await Request({
        url: `${SERVER_URL}/register`,
        body,
        method: 'POST',
      });

      if (loginResponse.status === 200) {
        dispatch({type: 'PROFILE_SUCCESS', payload: loginResponse});
        dispatch({type: 'LOGIN_SUCCESS', payload: loginResponse});
        goHome();
      } else dispatch({type: 'LOGIN_FAIL', payload: {}});
      // return response;
    } else {
      dispatch({type: 'LOGIN_FAIL', payload: {}});
    }
  } catch (error) {
    console.log('err----------------->', error.message);
    // Alert.alert('Error', errorConsts.apiError);
  }
};

// export const googleLoginAction = data => {
//   console.log('here', data);
//   return async dispatch => {
//     console.log('GoogleSignin=>>', GoogleSignin);

//   let googleKey ="1080541170987-p6kkt5m8uc6dd6ej7mc6ji3f81e7h3mv.apps.googleusercontent.com";
// GoogleSignin.configure({
//   // scopes: ['email', 'profile'],
//   webClientId: googleKey,
//   // offlineAccess: true,
//   // iosClientId: googleKey,
// })

// await GoogleSignin.hasPlayServices();
//       // await GoogleSignin.signOut();
//       const userInfo = await GoogleSignin.signIn();
// console.log('Dataaa=>>>>>', userInfo);

//   dispatch({ type: "LOGIN_REQUEST" });
//   try {
//     let GoogleSignIn = require("react-native-google-sign-in");
//     console.log(">>>>>>>> google sign in  requesting ... ")
//     await GoogleSignIn.configure({
//       clientID:'324498865665-0prca196fd8h406vuoa28apags5vf3su.apps.googleusercontent.com',
//       scopes: ["openid", "email", "profile"],
//       shouldFetchBasicProfile: true
//     });
//     const user = await GoogleSignIn.signIn();
//     console.log(">>>>>>>> google sign in ", user)
//     if(user.email){
//       let body = {
//         googleId:user.userID,
//         firstName:user.givenName,
//         lastName:user.familyName,
//         email:user.email,
//         type:'google',
//         google_token:user.accessToken,
//         latitude:data.latitude?data.latitude:'',
//         longitude:data.longitude?data.longitude:'',
//         deviceToken:data.deviceToken
//       }
//       console.log("body-------->",body)
//       const res = await Request({ url:`${SERVER_URL}/register`, body, method:"POST" });
//       if(res.status === 200){
//         console.log("res********",res)
//         dispatch({ type: "PROFILE_SUCCESS", payload: res });
//         dispatch({ type: "LOGIN_SUCCESS", payload: res });
//         goHome()
//       }
//       else {
//         dispatch({ type: 'LOGIN_FAIL' , payload:{}});

//       }
//     }
//     else{

//       dispatch => {dispatch({type:"LOGIN_FAIL"})}
//       Alert.alert("Error", errorConsts.apiError);
//     }
//   } catch (error) {
//     console.log('ctach error ==== > ', error)
//   }
//   };
// };
export const googleLoginAction = data => {
  return async dispatch => {
    dispatch({type: 'LOGIN_REQUEST'});
    // goHome();

    try {
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google response=>>', userInfo);

      if (userInfo && userInfo.idToken && userInfo.user) {
        let body = {
          googleId: userInfo.user && userInfo.user.id,
          firstName: userInfo.user && userInfo.user.givenName,
          lastName: userInfo.user && userInfo.user.familyName,
          email: userInfo.user && userInfo.user.email,
          type: 'google',
          google_token: userInfo.idToken,
          latitude: data.latitude,
          longitude: data.longitude,
          deviceToken: data.deviceToken,
        };
        console.log('URL++>>>', `${SERVER_URL}/register`);
        console.log('user--------->', body);
        const res = await Request({
          url: `${SERVER_URL}/register`,
          body,
          method: 'POST',
        });

        // console.log('Response from Googlesignin=>>>>', res);
        if (res.status === 200) {
          console.log('res********', res);
          dispatch({type: 'PROFILE_SUCCESS', payload: res});
          dispatch({type: 'LOGIN_SUCCESS', payload: res});
          goHome();
        } else {
          dispatch({type: 'LOGIN_FAIL', payload: {}});
        }
      } else {
        dispatch({type: 'LOGIN_FAIL', payload: {}});
      }
    } catch (error) {
      console.log(error, 'errorerrorerror');

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //signin cancelled
      } else if (error.code === statusCodes.IN_PROGRESS) {
        //signin inprogress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //playservice not available
      }
      // console.log('Error=>>>', error);
      // Alert.alert('Error', errorConsts.apiError);
    }
  };
};

passwordMatch = body => {
  try {
    return async dispatch => {
      dispatch({type: 'PASSWORD_REQUEST'});
      const response = await Request({
        url: `${SERVER_URL}/passwordMatch`,
        body,
        method: 'POST',
      });
      console.log('response ------------>', response);
      if (response.status === 200) {
        dispatch({type: 'PASSWORD_SUCCESS', payload: response});
        goHome();
      } else {
        Alert.alert(errorConsts.passwordError);
        dispatch({type: 'PASSWORD_FAIL'});
      }
    };
  } catch (error) {
    Alert.alert('Error', errorConsts.apiError);
    dispatch({type: 'PASSWORD_FAIL'});
  }
};

forgotPassword = body => {
  try {
    return async dispatch => {
      dispatch({type: 'FORGOT_REQUEST'});
      const response = await Request({
        url: `${SERVER_URL}/forgotPassword`,
        body,
        method: 'PUT',
      });

      if (response.status === 200) {
        goToAuth();
        dispatch({type: 'FORGOT_SUCCESS'});
        Alert.alert('Success', errorConsts.updatedSuccess);
      } else {
        Alert.alert(errorConsts.passwordError);
        dispatch({type: 'FORGOT_FAIL'});
      }
    };
  } catch (error) {
    Alert.alert('Error', errorConsts.apiError);
    dispatch({type: 'FORGOT_FAIL'});
  }
};

export const logout = authType => async dispatch => {
  console.log('authtypr--------------->', authType);
  if (authType === 'google') {
    try {
      goToAuth();
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      dispatch({type: 'LOGOUT', userData: null});
    } catch (error) {
      console.log(error, 'errorerrorerror sign OUT');
    }
  } else if (authType === 'facebook') {
    goToAuth();
    LoginManager.logOut();

    dispatch({type: 'LOGOUT', userData: null});
  } else {
    goToAuth();
    dispatch({type: 'LOGOUT', userData: null});
  }
};
