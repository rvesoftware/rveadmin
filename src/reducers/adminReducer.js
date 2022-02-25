import {
  ADMIN_LIST_FAIL,
  ADMIN_LIST_REQUEST,
    ADMIN_LIST_SUCCESS,
    ADMIN_SIGNIN_FAIL,
    ADMIN_SIGNIN_REQUEST,
    ADMIN_SIGNIN_SUCCESS,
    ADMIN_SIGNOUT,
  } from '../constants/adminConstants';


  export const adminListReducer = (state = { admins: [] }, action) => {
    switch (action.type) {
      case ADMIN_LIST_REQUEST:
        return { loading: true };
      case ADMIN_LIST_SUCCESS:
        return { loading: false, admins: action.payload };
      case ADMIN_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  

export const adminSigninReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_SIGNIN_REQUEST:
        return { loading: true };
      case ADMIN_SIGNIN_SUCCESS:
        return { loading: false, adminInfo: action.payload };
      case ADMIN_SIGNIN_FAIL:
        return { loading: false, error: action.payload };
      case ADMIN_SIGNOUT:
        return {};
      default:
        return state;
    }
  };