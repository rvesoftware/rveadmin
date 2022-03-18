import {
  QUOTATION_ADD_ITEM,
  QUOTATION_CREATE_FAIL,
  QUOTATION_CREATE_REQUEST,
  QUOTATION_CREATE_RESET,
  QUOTATION_CREATE_SUCCESS,
  QUOTATION_DELETE_FAIL,
  QUOTATION_DELETE_REQUEST,
  QUOTATION_DELETE_RESET,
  QUOTATION_DELETE_SUCCESS,
  QUOTATION_LIST_FAIL,
  QUOTATION_LIST_REQUEST,
  QUOTATION_LIST_SUCCESS,
  QUOTATION_REMOVE_ITEM,
  QUOTATION_SAVE_CLIENT,
  QUOTATION_DETAILS_REQUEST,
  QUOTATION_DETAILS_SUCCESS,
  QUOTATION_DETAILS_FAIL,
  QUOTATION_DETAILS_RESET,
  QUOTATION_EMPY,
} from '../constants/quotationConstants.js';

export const quotationListReducer = (
  state = { loading: true, quotations: [] },
  action
) => {
  switch (action.type) {
    case QUOTATION_LIST_REQUEST:
      return { loading: true };
    case QUOTATION_LIST_SUCCESS:
      return { loading: false, quotations: action.payload };
    case QUOTATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const quotationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUOTATION_CREATE_REQUEST:
      return { loading: true };
    case QUOTATION_CREATE_SUCCESS:
      return { loading: false, success: true, quotation: action.payload };
    case QUOTATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case QUOTATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const quotationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUOTATION_DELETE_REQUEST:
      return { loading: true };
    case QUOTATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUOTATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case QUOTATION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const quotationReducer = (state = {}, action) => {
  switch (action.type) {
    case QUOTATION_ADD_ITEM:
      const item = action.payload;
      const existItem = state.items.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          items: state.items.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, items: [...state.items, item] };
      }
    case QUOTATION_REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((x) => x.product !== action.payload),
      };
    case QUOTATION_SAVE_CLIENT:
      return { ...state, clientData: action.payload };
    case QUOTATION_EMPY:
      return { ...state, error: '', items: [] };
    default:
      return state;
  }
};

export const quotationDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case QUOTATION_DETAILS_REQUEST:
      return { loading: true };
    case QUOTATION_DETAILS_SUCCESS:
      return { loading: false, quotation: action.payload };
    case QUOTATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case QUOTATION_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
