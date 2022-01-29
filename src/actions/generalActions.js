import { TOGGLE_MENU, TOGGLE_THEME_MENU } from '../constants/generalConstants';

export const toggle = (isOpen) => (dispatch, getState) => {
  dispatch({ type: TOGGLE_MENU, payload: isOpen });
  localStorage.setItem('toggle', JSON.stringify({ isOpen }));
};

export const toggleThemeMenu = (isOpenThemeMenu) => (dispatch, getState) => {
  dispatch({ type: TOGGLE_THEME_MENU, payload: isOpenThemeMenu });
  localStorage.setItem('toggleThemeMenu', JSON.stringify({ isOpenThemeMenu }));
};