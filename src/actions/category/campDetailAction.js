import {
    SERVER_URL,
    errorConsts
  } from "../../constants";
import {Request} from "../../utilities";
import {Alert} from 'react-native'
import * as NavigationOptions from "../app";
  
export const campDetail = (itemDetail) => {
        return async (dispatch) => {
            dispatch({ type: "CAMP_DETAIL", payload: itemDetail });   
        }
};

export const campsitesList = (componenType,body,category) =>{
  var response;

    try {
        return async (dispatch) => {
          dispatch({ type: "LISTING_REQUEST" });
          
          if(componenType == 'Campsites')
             response = await Request({
              url: `${SERVER_URL}/campListingMobile`,
              method: "POST",
              body
            });
          
          if(componenType == 'Showers')
             response = await Request({
              url: `${SERVER_URL}/showersListingMobile`,
              method: "POST",
              body
            });
          
          if(componenType == 'Toilets')
             response = await Request({
              url: `${SERVER_URL}/toiletListingMobile`,
              method: "POST",
              body
            });
          
          if(componenType == 'Picnic')
             response = await Request({
              url: `${SERVER_URL}/picnicListingMobile`,
              method: "POST",
              body
            });
          
          if(componenType == 'Attrctions')
             response = await Request({
              url: `${SERVER_URL}/attractionsListingMobile`,
              method: "POST",
              body
            });
            if(componenType == 'PaidAttractions')
            response = await Request({
             url: `${SERVER_URL}/paidAttractionsListing`,
             method: "POST",
             body
           });
           if(componenType == 'PaidCampsites')
           response = await Request({
            url: `${SERVER_URL}/paidCampsitesListing`,
            method: "POST",
            body
          });
          
         
          console.log("response",response,componenType)
          if(response.status === 400){
            dispatch({ type: "LISTING_FAIL" });
            // console.log("status",response.status)
            Alert.alert("Sorry", "No data has been found");             
          }

          else if (response.status === 200){
            console.log("status",response.status)
            dispatch({ type: "LISTING_SUCCESS", payload: response, listingType:componenType});
            if(category === 'listing')dispatch(NavigationOptions.pushTParticulatScreen('Home','Categories'))
          
          }
          else {
            console.log("status",response.status)
            dispatch({ type: "LISTING_FAIL" });
            console.log("INSIDE ELSE")
          }
        };
      } catch (error) {
        Alert.alert("Error", errorConsts.apiError);
        dispatch({ type: "LISTING_FAIL" });
      }
};
export const CordinatesFetch = (body) =>{
  try {
    return async (dispatch) => {
      dispatch({ type: "CORDINATES_REQUEST" });

      const response = await Request({
          url: `${SERVER_URL}/fetchCoordinates`,
          method: "POST",
          body
        });
      

      console.log("response",response)
      if(response.status === 404){
        dispatch({ type: "CORDINATES_FAIL" });
        console.log("status",response.status)
        Alert.alert("Sorry", "No data has been found");             
      }

      else if (response.status === 200){
        console.log("status",response.status)
        dispatch({ type: "CORDINATES_SUCCESS", payload: response});      
      }
      else {
        console.log("status",response.status)
        dispatch({ type: "CORDINATES_FAIL" });
      }
    };
  } catch (error) {
    Alert.alert("Error", errorConsts.apiError);
    dispatch({ type: "CORDINATES_FAIL" });
  }
}
