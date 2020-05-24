
import Immutable from "seamless-immutable";
const initialState = Immutable({
    itemDetail: {},
});
export default function campDetailReducer(state = initialState, action = {}) {
    console.log("actionactionaction", action.payload)
    switch (action.type) {
        case "CAMP_DETAIL":
            return {
                ...state,
                campDetail: action.payload
            };

        // case "CAMPSITES_REQUEST":
        //     return {
        //         ...state,
        //         isloadig:true,
               
        //     };
        // case "CAMPSITES_SUCCESS":
        //     return {
        //         ...state,
        //         isloadig:false,
        //         campsiteListing:action.payload
        //     };
        // case "CAMPSITES_FAIL":
        //     return {
        //         ...state,
        //         isloadig:false,
        //         campsiteListing:null
        //     };
        case "LISTING_REQUEST":
            return {
                ...state,
                isloadig:true,
               
            };
        case "LISTING_SUCCESS":
       
            return {
                ...state,
                isloadig:false,
                campsiteListing:action.payload,
                listingType:action.listingType
            };
        case "LISTING_FAIL":
            return {
                ...state,
                isloadig:false,
                campsiteListing:null,
                listingType:null
            }

        case "CORDINATES_REQUEST":
            return {
                ...state,
                isloadig:true,
               
            };
        case "CORDINATES_SUCCESS":
       
            return {
                ...state,
                isloadig:false,
                mapListing:action.payload,
               
            };
            
        case "CORDINATES_FAIL":
            return {
                ...state,
                isloadig:false,
                mapListing:null,
               
            }
        default:
            return state;
    }
}
