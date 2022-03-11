import Axios from 'axios';
import {
  USER_LIST_FAIL, 
  USER_LIST_REQUEST, 
  USER_LIST_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,

} from '../constants/usersConstants';


export const listUsers = () => async (dispatch, getState) => {
    dispatch({type: USER_LIST_REQUEST});
    try{
        const {data} = await Axios.get('https://rveapi.herokuapp.com/api/v1/users/');
        console.log(data)
        dispatch({type: USER_LIST_SUCCESS, payload: data.allUsers});
    }catch(error){
        
        dispatch({type: USER_LIST_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, });
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