import Axios from 'axios'

import {
  NOTE_CREATE_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_CREATE_RESET,
//   NOTE_SIGNIN_REQUEST,
//   NOTE_SIGNIN_SUCCESS,
//   NOTE_SIGNOUT,

} from '../constants/notesConstants';

// const URL = 'http://localhost:4200/api/v1'
const URL = 'https://rveapiv2.herokuapp.com/api/v1'

export const createNote = () => async (dispatch) => {
    dispatch({ type: NOTE_CREATE_REQUEST });
    try {
      const { data } = await Axios.post(`${URL}/note`);

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
