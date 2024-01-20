import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./constants";
import { dataList } from "./data";

const initialState = {
    isAuthenticated: false,
    users:dataList
}

const AuthReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
        };
      
        case LOGOUT_SUCCESS:
        return {
          ...state,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };
  export default AuthReducer;