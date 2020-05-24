
import {Campsites,Showers,Toilets,Picnic,Attractions,find_place,profile,piadAttractions,piadCampsites} from '../assets/'
export const facebookUserApiUrl =
  "https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,name,picture&access_token=";
export const googleApiUrl = "324498865665-5co558t5s1hkedlndil19e9nrocb7jc5.apps.googleusercontent.com"
export const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const PLACES_API_KEY = 'AIzaSyAvWC5FxzIgT1UH3ZGzPMivSIJmaA9Bf48';

export const categoriesData = [
  {"name":"Campsites","type":"Campsites","image":Campsites},
  {"name":"Showers","type":"Showers","image":Showers},
  {"name":"Toilets","type":"Toilets","image":Toilets},
  {"name":"BBQ/Picnic","type":"Picnic","image":Picnic},
  {"name":"Attractions","type":"Attrctions","image":Attractions},
  {"name":"PaidCampsites","type":"PaidCampsites","image":piadCampsites},
  {"name":"PaidAttractions","type":"PaidAttractions","image":piadAttractions}
]

export const routes =  [
  { key: 'first', title: 'Find Place'},
  // { key: 'second', title: 'Favorite Places',home:fav_place},
  { key: 'second', title: 'Profile' },
]
 
export const cordinates = {
  latitude: -28.10762104959798,
  latitudeDelta: 50.12296273209397,
  longitude: 134.00947348234132,
  longitudeDelta: 36.3867180296906
}