import Axios from 'axios'

import {
  NOTE_CREATE_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_CREATE_RESET,
  NOTE_LIST_REQUEST,
  NOTE_LIST_SUCCESS,
  NOTE_LIST_FAIL,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_FAIL,
  NOTE_UPDATE_REQUEST,
//   NOTE_SIGNIN_REQUEST,
//   NOTE_SIGNIN_SUCCESS,
//   NOTE_SIGNOUT,

} from '../constants/notesConstants';


// const URL = 'http://localhost:4200/api/v1'
const URL = 'https://rveapiv2.herokuapp.com/api/v1'

export const listNotes = () => async (dispatch, getState) => {
  dispatch({type: NOTE_LIST_REQUEST});
  try{
    
      const {data} = await Axios.get(`${URL}/notes`);
      dispatch({type: NOTE_LIST_SUCCESS, payload: data});
  }catch(error){
      
      dispatch({type: NOTE_LIST_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, });
  }
}

export const createNote = () => async (dispatch) => {
    dispatch({ type: NOTE_CREATE_REQUEST });
    try {
      const { data } = await Axios.post(`${URL}/notes`);

      dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NOTE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const updateNote = (noteId, title, desc) => async(dispatch) => {
    dispatch({type: NOTE_UPDATE_REQUEST, payload: {title, desc}});
    try{
      console.log("veiene aca")
        const {data} = await Axios.put(`${URL}/notes/${noteId}`, {title, desc} );
        dispatch({type: NOTE_UPDATE_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: NOTE_UPDATE_FAIL, payload: message});
    }
};