import Axios from 'axios';
import {
  ORDER_LIST_FAIL, 
  ORDER_LIST_REQUEST, 
  ORDER_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,

} from '../constants/ordersConstants';


const URL = "https://rveapi.herokuapp.com/api/v1/";
// const URL = "http://localhost:4200/api/v1/";

export const listOrders = () => async (dispatch, getState) => {
    dispatch({type: ORDER_LIST_REQUEST});
    try{
        const {data} = await Axios.get(`${URL}orders/`);
        console.log(data)
        dispatch({type: ORDER_LIST_SUCCESS, payload: data});
    }catch(error){
        
        dispatch({type: ORDER_LIST_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, });
    }
}

// export const createTask = (priority, title, description, users) => async(dispatch) => {
//     dispatch({type: TASK_CREATE_REQUEST, payload: {priority, title, description, users}});
    
//     try{
//         const {data} = await Axios.post(`${URL}tasks/`, {priority, title, description, users});
//         dispatch({type: TASK_CREATE_SUCCESS, payload: data});
//     }catch(error){
//         const message = error.response && error.response.data.message ? error.response.data.message : error.message;
//         dispatch({type: TASK_CREATE_FAIL, payload: message});
//     }
// };

// export const updateTask = (task) => async(dispatch) => {
//     dispatch({type: TASK_UPDATE_REQUEST, payload: task});
    
//     try{
//         const {data} = await Axios.put(`${URL}tasks/${task._id}`, task);
//         dispatch({type: TASK_UPDATE_SUCCESS, payload: data});
//     }catch(error){
//         const message = error.response && error.response.data.message ? error.response.data.message : error.message;
//         dispatch({type: TASK_UPDATE_FAIL, payload: message});
//     }
// };

// export const deleteTask = (id) => async(dispatch, getState) => {
//     dispatch({type: TASK_DELETE_REQUEST, payload: id});
//     try{
//         Axios.delete(`${URL}/categories/${id}`);
//         dispatch({type: TASK_DELETE_SUCCESS})
//     }catch(error){
//         dispatch({type: TASK_DELETE_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, })
//     }
// };