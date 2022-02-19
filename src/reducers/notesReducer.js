import {
    NOTE_CREATE_FAIL,
    NOTE_CREATE_REQUEST,
    NOTE_CREATE_SUCCESS,
    NOTE_CREATE_RESET,
  } from '../constants/notesConstants';

export const noteCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case NOTE_CREATE_REQUEST:
        return { loading: true };
      case NOTE_CREATE_SUCCESS:
        return { loading: false, note: action.payload };
      case NOTE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case NOTE_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };