import {
    ORDER_DELETE_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_RESET,
    ORDER_DELETE_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
    ORDER_UPDATE_RESET,
  } from '../constants/ordersConstants';
  
  export const ordersListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_LIST_FAIL:
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