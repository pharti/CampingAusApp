
import Immutable from "seamless-immutable";

const initialState = Immutable({
  loading: false,
  isLoggedin:false,
  root: "login"
});

export default function login(state = initialState, action = {}) {
  switch (action.type) {
   
      case "OTP_REQUEST":
      return {
        ...state,
        Otploading: true
      };
    case "OTP_SUCCESS":
      return {
        ...state,
        Otploading: false,
        otp: action.payload
      };
    case "OTP_FAIL":
      return {
        ...state,
        Otploading: false
      };
      case "PROFILE_REQUEST":
      return {
        ...state,
        Profileloading: true
      };
    case "PROFILE_SUCCESS":
      return {
        ...state,
        Profileloading: false,
        isLoggedin:true,
        profile: action.payload
      };
    case "PROFILE_FAIL":
      return {
        ...state,
        Profileloading: false
      };
    case "PASSWORD_REQUEST":
    return {
      ...state,
        Ploading: true
    }
    case "PASSWORD_SUCCESS":
    return{
      ...state,
      Ploading: false,
      isLoggedin:true,
    }
    case "PASSWORD_FAIL":
    return{
      ...state,
      Ploading: false,
     
    }
    case "FORGOT_REQUEST":
    return {
      ...state,
        Floading: true
    }
    case "FORGOT_SUCCESS":
    return{
      ...state,
      Floading: false,
      isLoggedin:true,
    }
    case "FORGOT_FAIL":
    return{
      ...state,
      Floading: false,
     
    }
    case "LOGOUT":
      console.log(action, "store.getState().userstore.getState().user");
      return { ...state, isLoggedin: false, userData: null };

    default:
      return state;
  }
}
