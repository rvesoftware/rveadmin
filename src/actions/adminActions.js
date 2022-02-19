import Axios from 'axios'

import {
  ADMIN_REGISTER_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_SIGNIN_FAIL,
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNOUT,

} from '../constants/adminConstants';

// const URL = 'http://localhost:4200/api/v1'
const URL = 'https://rveapiv2.herokuapp.com/api/v1'

export const signin = (username, password) => async (dispatch) => {
    dispatch({ type: ADMIN_SIGNIN_REQUEST, payload: { username, password } });
    try {
      const { data } = await Axios.post(`${URL}/admins/signin`, { username, password });

      dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('adminInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ADMIN_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
