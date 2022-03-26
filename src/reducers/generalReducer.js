import { TOGGLE_MENU } from "../constants/generalConstants";

export const toggleMenu = (state = { isOpen: true }, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { isOpen: action.payload };
    default:
      return state;
  }
};

export const reducerGeneral = (state = {}, action) =>  {
  switch (action.type) {
    case "UPLOAD_REQUEST":
      return { loading: true };
    case "UPLOAD_SUCCESS":
      return { loading: false };
    default:
      return state;
  }
};