import Axios from "axios";
import constantsTemplate from '../constants/constantsTemplate.js'

export default class actionsTemplate {
    
    constructor(constants, api, newUrl){
        this.LIST_REQUEST = constants.LIST_REQUEST;
        this.LIST_SUCCESS = constants.LIST_SUCCESS;
        this.LIST_FAIL = constants.LIST_FAIL;

        this.CREATE_REQUEST = constants.CREATE_REQUEST;
        this.CREATE_SUCCESS = constants.CREATE_SUCCESS;
        this.CREATE_FAIL = constants.CREATE_FAIL;
        this.CREATE_RESET = constants.CREATE_RESET;

        this.DELETE_REQUEST = constants.DELETE_REQUEST;
        this.DELETE_SUCCESS = constants.DELETE_SUCCESS;
        this.DELETE_FAIL = constants.DELETE_FAIL;
        this.DELETE_RESET = constants.DELETE_RESET;

        this.UPDATE_REQUEST = constants.UPDATE_REQUEST;
        this.UPDATE_SUCCESS = constants.UPDATE_SUCCESS;
        this.UPDATE_FAIL    = constants.UPDATE_FAIL;
        this.UPDATE_RESET   = constants.UPDATE_RESET;

        this.DETAILS_REQUEST = constants.DETAILS_REQUEST;
        this.DETAILS_SUCCESS = constants.DETAILS_SUCCESS;
        this.DETAILS_FAIL    = constants.DETAILS_FAIL;
        this.DETAILS_RESET   = constants.DETAILS_RESET;

        this.api = api;

        this.URL = newUrl? newUrl : "https://rveapiv2.herokuapp.com"
        // this.URL = "http://localhost:4200"

    }

    listNewUrl = () => async(dispatch, getState) => {
        dispatch({type: this.LIST_REQUEST});
        try{
            const {data} = await Axios.get(`${this.URL}/${this.api}`);
            console.log(data)
            dispatch({type: this.LIST_SUCCESS, payload:data});
            console.log(data)
        }catch(err){
            dispatch({type: this.LIST_FAIL});
            console.log(err)
        }
    }

    list = () => async(dispatch, getState) => {
        dispatch({type: this.LIST_REQUEST});
        try{
            console.log(this.URL)
            const {data} = this.newUrl? await Axios.get(`${this.URL}/`) : await Axios.get(`${this.URL}/api/v1/${this.api}/`);
            dispatch({type: this.LIST_SUCCESS, payload:data});
            console.log(data)
        }catch(err){
            dispatch({type: this.LIST_FAIL});
            console.log(err)
        }
    }

    one = (id) => async(dispatch) => {
        dispatch({type: this.DETAILS_REQUEST, payload: id});
        try{
            const {data} = await Axios.get(`${this.URL}/api/v1/${this.api}/${id}`);
            dispatch({type: this.DETAILS_SUCCESS, payload:data});
            console.log(data)
        }catch(err){
            dispatch({type: this.DETAILS_FAIL});
            console.log(err)
        }
    }


    createNewUrl = (props) => async(dispatch) => {
        dispatch({type: this.CREATE_REQUEST, payload: props});
        console.log(props)
        try{
            const {data} = await Axios.put(`${this.URL}/${this.api}`, props);
            console.log(data)
            dispatch({type: this.CREATE_SUCCESS, payload: data});
        }catch(error){
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            dispatch({type: this.CREATE_FAIL, payload: message});
        }
    };

    create = (props) => async(dispatch) => {
        dispatch({type: this.CREATE_REQUEST, payload: props});
        
        try{
            const {data} = await Axios.post(`${this.URL}/api/v1/${this.api}/`, props);
            dispatch({type: this.CREATE_SUCCESS, payload: data});
        }catch(error){
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            dispatch({type: this.CREATE_FAIL, payload: message});
        }
    };

    update = (props) => async (dispatch, getState) => {
        dispatch({ type: this.UPDATE_REQUEST, payload: { props } });
    
        try {
          const { data } = await Axios.put(`${this.URL}/api/v1/${this.api}/${props._id}`, { props });
          dispatch({ type: this.UPDATE_SUCCESS, payload: data });
        } catch (err) {
          console.log(err);
          dispatch({ type: this.UPDATE_FAIL, payload: err });
        }
      };
      

      deleteNewUrl = (id) => async(dispatch, getState) => {
        dispatch({type: this.DELETE_REQUEST, payload: id});
        try{
            Axios.delete(`${this.URL}/${this.api}/${id}`);
            dispatch({type: this.DELETE_SUCCESS})
        }catch(error){
            dispatch({type: this.DELETE_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, })
        }
    };

    delete = (id) => async(dispatch, getState) => {
         dispatch({type: this.DELETE_REQUEST, payload: id});
         try{
             Axios.delete(`${this.URL}/api/v1/${this.api}/${id}`);
             dispatch({type: this.DELETE_SUCCESS})
         }catch(error){
             dispatch({type: this.DELETE_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, })
         }
     };
}

// import Axios from 'axios';
// import {
//   CATEGORY_LIST_FAIL, 
//   CATEGORY_LIST_REQUEST, 
//   CATEGORY_LIST_SUCCESS,
//   CATEGORY_CREATE_FAIL,
//   CATEGORY_CREATE_REQUEST,
//   CATEGORY_CREATE_SUCCESS,
//   CATEGORY_DELETE_FAIL,
//   CATEGORY_DELETE_REQUEST,
//   CATEGORY_DELETE_SUCCESS,

// } from '../constants/categoryConstants';



// export const listItems = () => async (dispatch, getState) => {

//     dispatch({type: CATEGORY_LIST_REQUEST});
//     try{
//         const {data} = await Axios.get('https://rveapi.herokuapp.com/api/v1/categories/');
//         dispatch({type: CATEGORY_LIST_SUCCESS, payload: data.categories});
//     }catch(error){
        
//         dispatch({type: CATEGORY_LIST_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, });
//     }
// }

// export const createCategory = (name) => async(dispatch) => {
//     dispatch({type: CATEGORY_CREATE_REQUEST, payload: {name}});
    
//     try{
//         const {data} = await Axios.post('https://rveapi.herokuapp.com/api/v1/categories/', {name});
//         dispatch({type: CATEGORY_CREATE_SUCCESS, payload: data});
//     }catch(error){
//         const message = error.response && error.response.data.message ? error.response.data.message : error.message;
//         dispatch({type: CATEGORY_CREATE_FAIL, payload: message});
//     }
// };


// export const deleteCategory = (id) => async(dispatch, getState) => {
//     dispatch({type: CATEGORY_DELETE_REQUEST, payload: id});
//     try{
//         Axios.delete(`http://rveapi.herokuapp.com/api/v1/categories/${id}`);
//         dispatch({type: CATEGORY_DELETE_SUCCESS})
//     }catch(error){
//         dispatch({type: CATEGORY_DELETE_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, })
//     }
// };
