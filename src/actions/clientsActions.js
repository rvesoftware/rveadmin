import Axios from 'axios';
import {
  CLIENT_LIST_FAIL, 
  CLIENT_LIST_REQUEST, 
  CLIENT_LIST_SUCCESS,
  CLIENT_CREATE_FAIL,
  CLIENT_CREATE_REQUEST,
  CLIENT_CREATE_SUCCESS,
  CLIENT_DELETE_FAIL,
  CLIENT_DELETE_REQUEST,
  CLIENT_DELETE_SUCCESS,
  CLIENT_UPDATE_REQUEST,
  CLIENT_UPDATE_SUCCESS,
  CLIENT_UPDATE_FAIL,

} from '../constants/clientsConstants';


export const listClients = () => async (dispatch, getState) => {
    dispatch({type: CLIENT_LIST_REQUEST});
    try{
        const {data} = await Axios.get('https://rveapi.herokuapp.com/api/v2/users/');
        console.log(data)
        dispatch({type: CLIENT_LIST_SUCCESS, payload: data.allClients});
    }catch(error){
        
        dispatch({type: CLIENT_LIST_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, });
    }
}

// export const createUser = (priority, title, description, users) => async(dispatch) => {
//     dispatch({type: TASK_CREATE_REQUEST, payload: {priority, title, description, users}});
    
//     try{
//         const {data} = await Axios.post('https://rveapi.herokuapp.com/api/v1/tasks/', {priority, title, description, users});
//         dispatch({type: TASK_CREATE_SUCCESS, payload: data});
//     }catch(error){
//         const message = error.response && error.response.data.message ? error.response.data.message : error.message;
//         dispatch({type: TASK_CREATE_FAIL, payload: message});
//     }
// };

// export const updateTask = (task) => async(dispatch) => {
//     dispatch({type: TASK_UPDATE_REQUEST, payload: task});
    
//     try{
//         const {data} = await Axios.put(`https://rveapi.herokuapp.com/api/v1/tasks/${task._id}`, task);
//         dispatch({type: TASK_UPDATE_SUCCESS, payload: data});
//     }catch(error){
//         const message = error.response && error.response.data.message ? error.response.data.message : error.message;
//         dispatch({type: TASK_UPDATE_FAIL, payload: message});
//     }
// };

// export const deleteTask = (id) => async(dispatch, getState) => {
//     dispatch({type: TASK_DELETE_REQUEST, payload: id});
//     try{
//         Axios.delete(`https://rveapi.herokuapp.com/api/v1/categories/${id}`);
//         dispatch({type: TASK_DELETE_SUCCESS})
//     }catch(error){
//         dispatch({type: TASK_DELETE_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, })
//     }
// };