export default class constantsTemplate {
    constructor(name){
        this.name = name;
    }

    constants() {

        const LIST_REQUEST = `${this.name}_LIST_REQUEST`;
        const LIST_SUCCESS = `${this.name}_LIST_SUCCESS`;
        const LIST_FAIL = `${this.name}_LIST_FAIL`; 
                
        const CREATE_REQUEST = `${this.name}_CREATE_REQUEST`;
        const CREATE_SUCCESS = `${this.name}_CREATE_SUCCESS`;
        const CREATE_FAIL =    `${this.name}_CREATE_FAIL`;
        const CREATE_RESET =   `${this.name}_CREATE_RESET`;

        const DETAILS_REQUEST = `${this.name}_DETAILS_REQUEST`;
        const DETAILS_SUCCESS = `${this.name}_DETAILS_SUCCESS`;
        const DETAILS_FAIL    = `${this.name}_DETAILS_FAIL`;
        const DETAILS_RESET   = `${this.name}_DETAILS_RESET`;

        const UPDATE_REQUEST = `${this.name}_UPDATE_REQUEST`;
        const UPDATE_SUCCESS = `${this.name}_UPDATE_SUCCESS`;
        const UPDATE_FAIL    = `${this.name}_UPDATE_FAIL`;
        const UPDATE_RESET   = `${this.name}_UPDATE_RESET`;
                
        const DELETE_REQUEST = `${this.name}_DELETE_REQUEST`;
        const DELETE_SUCCESS = `${this.name}_DELETE_SUCCESS`;
        const DELETE_FAIL =    `${this.name}_DELETE_FAIL`;
        const DELETE_RESET =   `${this.name}_DELETE_RESET`;

        return{
            LIST_REQUEST,
            LIST_SUCCESS,
            LIST_FAIL ,
            CREATE_REQUEST,
            CREATE_SUCCESS,
            CREATE_FAIL,
            CREATE_RESET,
            DELETE_REQUEST,
            DELETE_SUCCESS,
            DELETE_FAIL,
            DELETE_RESET,
            UPDATE_REQUEST,
            UPDATE_SUCCESS,
            UPDATE_FAIL,
            UPDATE_RESET,
            DETAILS_REQUEST,
            DETAILS_SUCCESS,
            DETAILS_FAIL,
            DETAILS_RESET
        }
    }
    
        
    //     CATEGORY_DELETE_REQUEST = 'CATEGORY_DELETE_REQUEST';
    //     CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
    //  CATEGORY_DELETE_FAIL = 'CATEGORY_DELETE_FAIL';
    //  CATEGORY_DELETE_RESET = 'CATEGORY_DELETE_RESET';
     
    //  CATEGORY_CREATE_REQUEST = 'CATEGORY_CREATE_REQUEST';
    //  CATEGORY_CREATE_SUCCESS = 'CATEGORY_CREATE_SUCCESS';
    //  CATEGORY_CREATE_FAIL = 'CATEGORY_CREATE_FAIL';
    //  CATEGORY_CREATE_RESET = 'CATEGORY_CREATE_RESET';
    // }
    
}