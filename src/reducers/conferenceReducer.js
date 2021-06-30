import { CREATE_CONFERENCE, GET_ALL_CONFERENCES, GET_CONFERENCE, SET_CONFERENCE, UPDATE_CONFERENCE, 
  DELETE_CONFERENCE, GET_CONFERENCES_FOR_ADMIN, SET_CONFERENCE_STATUS, GET_CONFERENCE_FOR_HOME_PAGE } from '../actions/index';

  const initialState = {
    createconference: '',
    getconferences: [],
    homepageconference: '',
    getconference: '',
    setconference: '',
    updateconference: '',
    deleteconference: '',
    getadminconferences: [],
    setconferencestatus: '',
    createconferenceError: null,
    getconferencesError: null,
    getconferenceError: null,
    updateconferenceError: null,
    deleteconferenceError: null,
    getadminconferencesError: null,
    setconferencestatusError: null,
    homepageconferenceError: null
  };

  function conferenceReducer(state = initialState, action) {
    let createconference, getconferences, getconference, setconference, updateconference, deleteconference,
      getadminconferences, setconferencestatus, homepageconference;
    
    switch (action.type) {
      case `${CREATE_CONFERENCE}_PENDING`:
      case `${GET_ALL_CONFERENCES}_PENDING`:
      case `${GET_CONFERENCE}_PENDING`:
      case `${UPDATE_CONFERENCE}_PENDING`:
      case `${DELETE_CONFERENCE}_PENDING`:
      case `${GET_CONFERENCES_FOR_ADMIN}_PENDING`:
      case `${SET_CONFERENCE_STATUS}_PENDING`:
      case `${GET_CONFERENCE_FOR_HOME_PAGE}_PENDING`:
        return { ...state, loading: true, 
          createconferenceError: null,
          getconferencesError: null,
          getconferenceError: null,
          updateconferenceError: null,
          deleteconferenceError: null,
          getadminconferencesError: null,
          setconferencestatusError: null,
          homepageconferenceError: null
        };
    
      case `${CREATE_CONFERENCE}_FULFILLED`:
        createconference = action.payload.data;
        return { ...state, loading: false, createconference };
      case `${GET_ALL_CONFERENCES}_FULFILLED`:
        getconferences = action.payload.data;
        return { ...state, loading: false, getconferences };
      case `${GET_CONFERENCE}_FULFILLED`:
        getconference = action.payload.data;
        return { ...state, loading: false, getconference };
      case `${SET_CONFERENCE}`:
        setconference = action.payload.data;
        return { ...state, loading: false, setconference };
      case `${UPDATE_CONFERENCE}_FULFILLED`:
        updateconference = action.payload.data;
        return { ...state, loading: false, updateconference };
      case `${DELETE_CONFERENCE}_FULFILLED`:
        deleteconference = action.payload.data;
        return { ...state, loading: false, deleteconference };
      case `${GET_CONFERENCES_FOR_ADMIN}_FULFILLED`:
        getadminconferences = action.payload.data.data;
        return { ...state, loading: false, getadminconferences };
      case `${SET_CONFERENCE_STATUS}_FULFILLED`:
        setconferencestatus = action.payload.data;
        return { ...state, loading: false, setconferencestatus };
      case `${GET_CONFERENCE_FOR_HOME_PAGE}_FULFILLED`:
        homepageconference = action.payload.data;
        return { ...state, loading: false, homepageconference };

      case `${CREATE_CONFERENCE}_REJECTED`:
        return { ...state, loading: false, createconferenceError: action.payload.data, state: initialState };
      case `${GET_ALL_CONFERENCES}_REJECTED`:
        return { ...state, loading: false, getconferencesError: action.payload.data, state: initialState };
      case `${GET_CONFERENCE}_REJECTED`:
        return { ...state, loading: false, getconferenceError: action.payload.data, state: initialState };
      case `${UPDATE_CONFERENCE}_REJECTED`:
        return { ...state, loading: false, updateconferenceError: action.payload.data, state: initialState };
      case `${DELETE_CONFERENCE}_REJECTED`:
        return { ...state, loading: false, deleteconferenceError: action.payload.data, state: initialState };
      case `${GET_CONFERENCES_FOR_ADMIN}_REJECTED`:
        return { ...state, loading: false, getadminconferencesError: action.payload.data, state: initialState };
      case `${SET_CONFERENCE_STATUS}_REJECTED`:
        return { ...state, loading: false, setconferencestatusError: action.payload.data, state: initialState };
      case `${GET_CONFERENCE_FOR_HOME_PAGE}_REJECTED`:
        return { ...state, loading: false, homepageconferenceError: action.payload.data, state: initialState };
      
      default:
        return state;
    }
  }

  export default conferenceReducer;