export default class reducerTemplate{
    constructor(constants){

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

    }

    
    listReducer = (state = { data: [] }, action) => {
        switch (action.type) {
          case this.LIST_REQUEST:
            return { loading: true };
          case this.LIST_SUCCESS:
            return { loading: false, data: action.payload };
          case this.LIST_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      };

        
  createReducer = (state = {}, action) => {
    switch (action.type) {
      case this.CREATE_REQUEST:
        return { loading: true };
      case this.CREATE_SUCCESS:
        return { loading: false, success: true };
      case this.CREATE_FAIL:
        return { loading: false, error: action.payload };
      case this.CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  deleteReducer = (state = {}, action) => {
    switch (action.type) {
      case this.DELETE_REQUEST:
        return { loading: true };
      case this.DELETE_SUCCESS:
        return { loading: false, success: true };
      case this.DELETE_FAIL:
        return { loading: false, error: action.payload };
      case this.DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
}