import {
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_RESET,
    USER_DELETE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_CREATE_FAIL,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_CREATE_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
  } from '../constants/usersConstants';
  
  export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case USER_LIST_REQUEST:
        return { loading: true };
      case USER_LIST_SUCCESS:
        return { loading: false, users: action.payload };
      case USER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
//   export const taskCreateReducer = (state = {}, action) => {
//     switch (action.type) {
//       case TASK_CREATE_REQUEST:
//         return { loading: true };
//       case TASK_CREATE_SUCCESS:
//         return { loading: false, success: true };
//       case TASK_CREATE_FAIL:
//         return { loading: false, error: action.payload };
//       case TASK_CREATE_RESET:
//         return {};
//       default:
//         return state;
//     }
//   };
  
//   export const categoryDeleteReducer = (state = {}, action) => {
//     switch (action.type) {
//       case TASK_DELETE_REQUEST:
//         return { loading: true };
//       case TASK_DELETE_SUCCESS:
//         return { loading: false, success: true };
//       case TASK_DELETE_FAIL:
//         return { loading: false, error: action.payload };
//       case TASK_DELETE_RESET:
//         return {};
//       default:
//         return state;
//     }
//   };

//   export const taskUpdateReducer = (state = {}, action) => {
//     switch (action.type) {
//       case TASK_UPDATE_REQUEST:
//         return { loading: true };
//       case TASK_UPDATE_SUCCESS:
//         return { loading: false, success: true };
//       case TASK_UPDATE_FAIL:
//         return { loading: false, error: action.payload };
//       case TASK_UPDATE_RESET:
//         return {};
//       default:
//         return state;
//     }
//   };