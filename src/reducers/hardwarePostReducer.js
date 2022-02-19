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

  export const hardwarePostListReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
      case HARDWARE_POST_LIST_REQUEST:
        return { loading: true };
      case HARDWARE_POST_LIST_SUCCESS:
        return { loading: false, posts: action.payload };
      case HARDWARE_POST_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

// export const noteCreateReducer = (state = {}, action) => {
//     switch (action.type) {
//       case NOTE_CREATE_REQUEST:
//         return { loading: true };
//       case NOTE_CREATE_SUCCESS:
//         return { loading: false, note: action.payload };
//       case NOTE_CREATE_FAIL:
//         return { loading: false, error: action.payload };
//       case NOTE_CREATE_RESET:
//         return {};
//       default:
//         return state;
//     }
//   };