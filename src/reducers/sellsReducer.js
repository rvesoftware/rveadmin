import {
    SELL_ADD_ITEM,
    SELL_CREATE_FAIL,
    SELL_CREATE_REQUEST,
    SELL_CREATE_RESET,
    SELL_CREATE_SUCCESS,
    SELL_DELETE_FAIL,
    SELL_DELETE_REQUEST,
    SELL_DELETE_RESET,
    SELL_DELETE_SUCCESS,
    SELL_LIST_FAIL,
    SELL_LIST_REQUEST,
    SELL_LIST_SUCCESS,
    SELL_REMOVE_ITEM,
    SELL_SAVE_CLIENT,
    SELL_DETAILS_REQUEST,
    SELL_DETAILS_SUCCESS,
    SELL_DETAILS_FAIL,
    SELL_DETAILS_RESET,
    SELL_EMPY,
  } from '../constants/sellsConstants.js';
  
  export const sellsListReducer = (
    state = { loading: true, quotations: [] },
    action
  ) => {
    switch (action.type) {
      case SELL_LIST_REQUEST:
        return { loading: true };
      case SELL_LIST_SUCCESS:
        return { loading: false, sells: action.payload };
      case SELL_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const sellsCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SELL_CREATE_REQUEST:
        return { loading: true };
      case SELL_CREATE_SUCCESS:
        return { loading: false, success: true, sell: action.payload };
      case SELL_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case SELL_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const sellDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SELL_DELETE_REQUEST:
        return { loading: true };
      case SELL_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SELL_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case SELL_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
  
//   export const quotationReducer = (state = {}, action) => {
//     switch (action.type) {
//       case QUOTATION_ADD_ITEM:
//         const item = action.payload;
//         const existItem = state.items.find((x) => x.product === item.product);
//         if (existItem) {
//           return {
//             ...state,
//             items: state.items.map((x) =>
//               x.product === existItem.product ? item : x
//             ),
//           };
//         } else {
//           return { ...state, items: [...state.items, item] };
//         }
//       case QUOTATION_REMOVE_ITEM:
//         return {
//           ...state,
//           items: state.items.filter((x) => x.product !== action.payload),
//         };
//       case QUOTATION_SAVE_CLIENT:
//         return { ...state, clientData: action.payload };
//       case QUOTATION_EMPY:
//         return { ...state, error: '', items: [] };
//       default:
//         return state;
//     }
//   };
  
//   export const quotationDetailsReducer = (state = { loading: true }, action) => {
//     switch (action.type) {
//       case QUOTATION_DETAILS_REQUEST:
//         return { loading: true };
//       case QUOTATION_DETAILS_SUCCESS:
//         return { loading: false, quotation: action.payload };
//       case QUOTATION_DETAILS_FAIL:
//         return { loading: false, error: action.payload };
//       case QUOTATION_DETAILS_RESET:
//         return {};
//       default:
//         return state;
//     }
//   };
  