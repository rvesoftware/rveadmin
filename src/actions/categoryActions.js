import Axios from 'axios';
import {
  CATEGORY_LIST_FAIL, 
  CATEGORY_LIST_REQUEST, 
  CATEGORY_LIST_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,

} from '../constants/categoryConstants';


export const listCategories = () => async (dispatch, getState) => {
    dispatch({type: CATEGORY_LIST_REQUEST});
    try{
        const {data} = await Axios.get('https://rveapi.herokuapp.com/api/v1/categories/');
        dispatch({type: CATEGORY_LIST_SUCCESS, payload: data.categories});
    }catch(error){
        
        dispatch({type: CATEGORY_LIST_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, });
    }
}

export const createCategory = (name) => async(dispatch) => {
    dispatch({type: CATEGORY_CREATE_REQUEST, payload: {name}});
    
    try{
        const {data} = await Axios.post('https://rveapi.herokuapp.com/api/v1/categories/', {name});
        dispatch({type: CATEGORY_CREATE_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: CATEGORY_CREATE_FAIL, payload: message});
    }
};


export const deleteCategory = (id) => async(dispatch, getState) => {
    dispatch({type: CATEGORY_DELETE_REQUEST, payload: id});
    try{
        Axios.delete(`http://rveapi.herokuapp.com/api/v1/categories/${id}`);
        dispatch({type: CATEGORY_DELETE_SUCCESS})
    }catch(error){
        dispatch({type: CATEGORY_DELETE_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, })
    }
};
