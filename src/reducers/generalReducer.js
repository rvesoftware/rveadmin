import { TOGGLE_MENU } from '../constants/generalConstants';

export const toggleMenu = (state = { isOpen: true }, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { isOpen: action.payload };
    default:
      return state;
  }
};
