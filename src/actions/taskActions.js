import Axios from 'axios';
import {
  TASK_LIST_FAIL, 
  TASK_LIST_REQUEST, 
  TASK_LIST_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,

} from '../constants/taskConstants';


export const listTasks = () => async (dispatch, getState) => {
    dispatch({type: TASK_LIST_REQUEST});
    try{
        const {data} = await Axios.get('https://rveapi.herokuapp.com/api/v1/tasks/');
        console.log(data)
        dispatch({type: TASK_LIST_SUCCESS, payload: data.tasks});
    }catch(error){
        
        dispatch({type: TASK_LIST_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, });
    }
}

export const createTask = (priority, title, description, users) => async(dispatch) => {
    dispatch({type: TASK_CREATE_REQUEST, payload: {priority, title, description, users}});
    
    try{
        const {data} = await Axios.post('https://rveapi.herokuapp.com/api/v1/tasks/', {priority, title, description, users});
        dispatch({type: TASK_CREATE_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: TASK_CREATE_FAIL, payload: message});
    }
};

export const updateTask = (task) => async(dispatch) => {
    dispatch({type: TASK_UPDATE_REQUEST, payload: task});
    
    try{
        const {data} = await Axios.put(`https://rveapi.herokuapp.com/api/v1/tasks/${task._id}`, task);
        dispatch({type: TASK_UPDATE_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: TASK_UPDATE_FAIL, payload: message});
    }
};

export const deleteTask = (id) => async(dispatch, getState) => {
    dispatch({type: TASK_DELETE_REQUEST, payload: id});
    try{
        Axios.delete(`https://rveapi.herokuapp.com/api/v1/categories/${id}`);
        dispatch({type: TASK_DELETE_SUCCESS})
    }catch(error){
        dispatch({type: TASK_DELETE_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, })
    }
};