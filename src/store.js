import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { toggleMenu } from './reducers/generalReducer';
import { adminSigninReducer } from './reducers/adminReducer.js';
import { noteCreateReducer } from './reducers/notesReducer';
import { hardwarePostListReducer } from './reducers/hardwarePostReducer';
import { taskCreateReducer, taskListReducer, taskUpdateReducer } from './reducers/taskReducer';
import { userListReducer } from './reducers/userReducer';
// import {
//   categoryCreateReducer,
//   categoryDeleteReducer,
//   categoryListReducer,
// } from './reducers/categoryReducer.js';
// import {
//   productCreateReducer,
//   productDeleteReducer,
//   productListReducer,
// } from './reducers/productReducer.js';
// import {
//   computerCreateReducer,
//   computerDeleteReducer,
//   computerListReducer,
//   computerReducer,
// } from './reducers/computerReducer.js';
// import {
//   quotationCreateReducer,
//   quotationDetailsReducer,
//   quotationDeleteReducer,
//   quotationListReducer,
//   quotationReducer,
// } from './reducers/quotationReducer.js';
// import {
//   taskCreateReducer,
//   taskListReducer,
//   taskUpdateReducer,
// } from './reducers/taskReducer.js';
// import { sellDeleteReducer, sellsCreateReducer, sellsListReducer } from './reducers/sellsReducer';

const initialState = {
  adminSignin: {
    adminInfo: localStorage.getItem('adminInfo')
      ? JSON.parse(localStorage.getItem('adminInfo'))
      : null,
  },
//   quotation: {
//     items: localStorage.getItem('items')
//       ? JSON.parse(localStorage.getItem('items'))
//       : [],
//     clientData: localStorage.getItem('clientData')
//       ? JSON.parse(localStorage.getItem('clientData'))
//       : {},
//   },
//   computer: {
//     specs: localStorage.getItem('specs')
//       ? JSON.parse(localStorage.getItem('specs'))
//       : [],
//   },
};

const reducer = combineReducers({
    toggle: toggleMenu,
    adminSignin: adminSigninReducer,
    noteCreate: noteCreateReducer,
    hardwarePostList: hardwarePostListReducer,
    taskList: taskListReducer,
    taskCreate: taskCreateReducer,
    taskUpdate: taskUpdateReducer,
    userList: userListReducer,
    // categoryList: categoryListReducer,
    // categoryCreate: categoryCreateReducer,
    // categoryDelete: categoryDeleteReducer,
    // productList: productListReducer,
    // productCreate: productCreateReducer,
    // productDelete: productDeleteReducer,
    // computer: computerReducer,
    // computerList: computerListReducer,
    // computerCreate: computerCreateReducer,
    // computerDelete: computerDeleteReducer,
    // quotation: quotationReducer,
    // quotationCreate: quotationCreateReducer,
    // quotationList: quotationListReducer,
    // quotationDelete: quotationDeleteReducer,
    // quotationDetails: quotationDetailsReducer,
    // taskList: taskListReducer,
    // taskCreate: taskCreateReducer,
    // taskUpdate: taskUpdateReducer,
    // sellsList: sellsListReducer,
    // sellCreate: sellsCreateReducer,
    // sellDelete: sellDeleteReducer
  });
  
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );
  
  export default store;