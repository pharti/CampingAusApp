import Immutable from "seamless-immutable";
const initialState = Immutable({
  loading: false,
  userData: null
});

export default (user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading:true,
        userData: null
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading:false,
        // isLoggedin:true,
        userData: action.payload,
        
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        loading:false,
        userData: null
      };
      case "IMAGE_REQUEST":
      return {
        ...state,
        isloading:true,
       
      };
    case "IMAGE_SUCCESS":
      return {
        ...state,
        isloading:false,
        
        
      };
    case "IMAGE_FAILED":
      return {
        ...state,
        isloading:false,
      };

    case "DISABLE_LOADER":
      return {
        ...state,
        isloading:false,
        loading:false,
      };
    
    default:
      return state;
  }
});
