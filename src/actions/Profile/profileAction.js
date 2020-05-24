import { SERVER_URL,errorConsts } from "../../constants/";
import * as NavigationOptions from "../app";
import {Request} from "../../utilities"
import { Alert} from "react-native";

export const updateEmail = (body, componentId) => {

  try {
    return async (dispatch) => {
      dispatch({ type: "EMAIL_REQUEST" });
      const response = await Request({
        url: `${SERVER_URL}/updateEmail`,
        body,
        method: "PUT"
      });
      if (response.status === 200) {
        dispatch({ type:"LOGIN_SUCCESS", payload: response });
       dispatch(NavigationOptions.pop(componentId))
      } else {
        Alert.alert(
          "Error",
          errorConsts.invalidEmail
        );
        dispatch({ type: "EMAIL_FAIL" });
      }
    }
  } catch (error) {
      Alert.alert(
        "Error",
        errorConsts.apiError
      );
      dispatch({ type: "EMAIL_FAIL" });
  }
};
export const updatePhone = (body, componentId) => {
    console.log("body",body,componentId)
  try {
    return async (dispatch) => {
      dispatch({ type: "PHONE_REQUEST" });
      const response = await Request({
        url: `${SERVER_URL}/updateNumber`,
        body,
        method: "PUT"
      });
     console.log("response",response)
      if (response.status === 200) {
        dispatch({ type:"LOGIN_SUCCESS", payload: response });
       dispatch(NavigationOptions.pop(componentId))
      } else {
        Alert.alert(
          "Error",
          errorConsts.apiError
        );
        dispatch({ type: "PHONE_FAIL" });
      }
    }
  } catch (error) {
      Alert.alert(
        "Error",
        errorConsts.apiError
      );
      dispatch({ type: "PHONE_FAIL" });
  }
};
export const addUserPic = (body)=> {
   return async dispatch => {
     dispatch({ type: 'IMAGE_REQUEST' });
       try {
             let url='';
               const {userId, uploadImage} = body;
               if(userId) url = `${SERVER_URL}/image`
             
               console.log('url >>>>> ',url)
               const formData = new FormData();
               formData.append('uploadImage', {
                 uri:  uploadImage.uri, 
                 name:uploadImage.fileName,
                 type : 'image/jpeg',
               });
               formData.append('userId',userId);
               const params = { method: 'PUT', timeout:1000*60*2, headers: {'Content-Type': 'multipart/form-data'}, body: formData }
               const response = await fetch(url,params).then(res => res.json()).then(users =>{
                if(users.status === 200){
                  console.log("---------------------",users)
                  dispatch({ type:"LOGIN_SUCCESS", payload: users });
                  dispatch({ type: 'IMAGE_SUCCESS' });
                  
                }
                else{
                  dispatch({ type: 'IMAGE_FAILED' });
                 
                }  
               })        
                             
       } catch (error) {
         console.log("error ",error)
         dispatch({ type: 'IMAGE_FAILED' });
        
       }
     };
  }
