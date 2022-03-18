import Axios from 'axios';
import {
  SELL_ADD_ITEM,
  SELL_CREATE_REQUEST,
  SELL_LIST_FAIL,
  SELL_CREATE_SUCCESS,
  SELL_CREATE_FAIL,
  SELL_LIST_REQUEST,
  SELL_LIST_SUCCESS,
  SELL_DELETE_REQUEST,
  SELL_DELETE_SUCCESS,
  SELL_DELETE_FAIL,
  SELL_REMOVE_ITEM,
  SELL_DETAILS_REQUEST,
  SELL_DETAILS_SUCCESS,
  SELL_DETAILS_FAIL,
  SELL_EMPY,
} from '../constants/sellsConstants';

export const listSells = () => async (dispatch) => {
  dispatch({
    type: SELL_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      'https://rveapi.herokuapp.com/api/v1/sells'
    );
    dispatch({ type: SELL_LIST_SUCCESS, payload: data.sells });
  } catch (error) {
    dispatch({ type: SELL_LIST_FAIL, payload: error.message });
  }
};

// export const addToCart = (id, qty, pos) => async (dispatch, getState) => {
//   const { data } = await Axios.get(
//     `https://rveapi.herokuapp.com/api/v1/products/${id}`
//   );

//   dispatch({
//     type: QUOTATION_ADD_ITEM,
//     payload: {
//       id: data._id,
//       product: data.category,
//       name: data.name,
//       price: data.price,
//       qty,
//       pos,
//     },
//   });
//   localStorage.setItem('items', JSON.stringify(getState().quotation.items));
// };

// export const sendEmail = (email) => async (dispatch, getState) => {
//   try {
//      await Axios.post(
//       'https://rveapi.herokuapp.com/api/v1/quotations/email',
//       email,
//       {}
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const removeItem = (computerId) => (dispatch, getState) => {
//   dispatch({ type: QUOTATION_REMOVE_ITEM, payload: computerId });
//   localStorage.setItem('items', JSON.stringify(getState().quotation.items));
// };

export const createSell = (sell) => async (dispatch, getState) => {
  dispatch({ type: SELL_CREATE_REQUEST, payload: sell });
  try {
    const { data } = await Axios.post(
      'https://rveapi.herokuapp.com/api/v1/sells',
      sell,
      {}
    );

    dispatch({ type: SELL_CREATE_SUCCESS, payload: data.sells });
  } catch (error) {
    dispatch({
      type: SELL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSell = (sellId) => async (dispatch, getState) => {
  dispatch({ type: SELL_DELETE_REQUEST, payload: sellId });
  try {
    await Axios.delete(
      `https://rveapi.herokuapp.com/api/v1/sells/${sellId}`
    );
    dispatch({ type: SELL_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: SELL_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const detailsQuotation = (quotationId) => async (dispatch) => {
//   dispatch({ type: QUOTATION_DETAILS_REQUEST, payload: quotationId });
//   try {
//     const { data } = await Axios.get(
//       `https://rveapi.herokuapp.com/api/v1/quotations/${quotationId}`
//     );
//     dispatch({ type: QUOTATION_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: QUOTATION_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const removeItems = () => (dispatch, getState) => {
//   localStorage.removeItem('items');
//   dispatch({ type: QUOTATION_EMPY });
// };
