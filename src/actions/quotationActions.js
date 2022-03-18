import Axios from 'axios';
import {
  QUOTATION_ADD_ITEM,
  QUOTATION_CREATE_REQUEST,
  QUOTATION_LIST_FAIL,
  QUOTATION_CREATE_SUCCESS,
  QUOTATION_CREATE_FAIL,
  QUOTATION_LIST_REQUEST,
  QUOTATION_LIST_SUCCESS,
  QUOTATION_DELETE_REQUEST,
  QUOTATION_DELETE_SUCCESS,
  QUOTATION_DELETE_FAIL,
  QUOTATION_REMOVE_ITEM,
  QUOTATION_DETAILS_REQUEST,
  QUOTATION_DETAILS_SUCCESS,
  QUOTATION_DETAILS_FAIL,
  QUOTATION_EMPY,
} from '../constants/quotationConstants';

export const listQuotations = () => async (dispatch) => {
  dispatch({
    type: QUOTATION_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      'https://rveapi.herokuapp.com/api/v1/quotations'
    );
    dispatch({ type: QUOTATION_LIST_SUCCESS, payload: data.quotations });
  } catch (error) {
    dispatch({ type: QUOTATION_LIST_FAIL, payload: error.message });
  }
};

export const addToCart = (id, qty, pos) => async (dispatch, getState) => {
  const { data } = await Axios.get(
    `https://rveapi.herokuapp.com/api/v1/products/${id}`
  );

  dispatch({
    type: QUOTATION_ADD_ITEM,
    payload: {
      id: data._id,
      product: data.category,
      name: data.name,
      price: data.price,
      qty,
      pos,
    },
  });
  localStorage.setItem('items', JSON.stringify(getState().quotation.items));
};

export const sendEmail = (email) => async (dispatch, getState) => {
  try {
     await Axios.post(
      'https://rveapi.herokuapp.com/api/v1/quotations/email',
      email,
      {}
    );
  } catch (err) {
    console.log(err);
  }
};

export const removeItem = (computerId) => (dispatch, getState) => {
  dispatch({ type: QUOTATION_REMOVE_ITEM, payload: computerId });
  localStorage.setItem('items', JSON.stringify(getState().quotation.items));
};

export const createQuotation = (quotation) => async (dispatch, getState) => {
  dispatch({ type: QUOTATION_CREATE_REQUEST, payload: quotation });
  try {
    const { data } = await Axios.post(
      'https://rveapi.herokuapp.com/api/v1/quotations',
      quotation,
      {}
    );

    dispatch({ type: QUOTATION_CREATE_SUCCESS, payload: data.quotations });
  } catch (error) {
    dispatch({
      type: QUOTATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteQuotation = (quotationId) => async (dispatch, getState) => {
  dispatch({ type: QUOTATION_DELETE_REQUEST, payload: quotationId });
  try {
    await Axios.delete(
      `https://rveapi.herokuapp.com/api/v1/quotations/${quotationId}`
    );
    dispatch({ type: QUOTATION_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: QUOTATION_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsQuotation = (quotationId) => async (dispatch) => {
  dispatch({ type: QUOTATION_DETAILS_REQUEST, payload: quotationId });
  try {
    const { data } = await Axios.get(
      `https://rveapi.herokuapp.com/api/v1/quotations/${quotationId}`
    );
    dispatch({ type: QUOTATION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QUOTATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeItems = () => (dispatch, getState) => {
  localStorage.removeItem('items');
  dispatch({ type: QUOTATION_EMPY });
};
