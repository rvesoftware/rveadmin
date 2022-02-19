import Axios from 'axios'

import {
  HARDWARE_POST_CREATE_FAIL,
  HARDWARE_POST_CREATE_REQUEST,
  HARDWARE_POST_CREATE_SUCCESS,
  HARDWARE_POST_CREATE_RESET,
  HARDWARE_POST_LIST_FAIL,
  HARDWARE_POST_LIST_REQUEST,
  HARDWARE_POST_LIST_SUCCESS,
  HARDWARE_POST_LIST_RESET,

} from '../constants/hardwarePostConstants';

// const URL = 'http://localhost:4200/api/v1'
const URL = 'https://rveapiv2.herokuapp.com/api/v1'

export const listHardwarePosts = () => async (dispatch, getState) => {
  dispatch({ type: HARDWARE_POST_LIST_REQUEST });
  
  try {
    const { data } = await Axios.get(
      `http://localhost:4200/api/v1/hardwarePosts`
    );

    console.log(data);
    dispatch({ type: HARDWARE_POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HARDWARE_POST_LIST_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const createNote = () => async (dispatch) => {
//     dispatch({ type: NOTE_CREATE_REQUEST });
//     try {
//       const { data } = await Axios.post(`${URL}/note`);

//       dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
//     } catch (error) {
//       dispatch({
//         type: NOTE_CREATE_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };
