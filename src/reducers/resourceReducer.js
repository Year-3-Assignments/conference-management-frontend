import { CREATE_RESOURCE, GET_ALL_RESOURCES, SET_RESOURCE, GET_RESOURCE, GET_EDITOR_RESOURCES, 
  UPDATE_RESOURCE, DELETE_RESOURCE, CHANGE_RESOURCE_STATUS, RESOURCE_PAYMENT, 
  GET_RESOURCES_FOR_USER, GET_ADMIN_RESOURCES } from '../actions/index';

const initialState = {
  createResource: '',
  allResources: [],
  userResources: [],
  editorResources: [],
  adminResources: [],
  getResource: '',
  setResource: '',
  updateResource: '',
  deleteResource: '',
  changeResourceStatus: '',
  paidResource: '',
  createResourceError: null,
  allResourcesError: null,
  userResourcesError: null,
  editorResourcesError: null,
  getResourceError: null,
  updateResourceError: null,
  deleteResourceError: null,
  changeResourceStatusError: null,
  paidResourceError: null,
  adminResourcesError: null
};

function resourceReducer(state = initialState, action) {
  let createResource, allResources, editorResources, getResource, setResource, updateResource,
    deleteResource, changeResourceStatus, paidResource, userResources, adminResources;
  
  switch (action.type) {
    case `${CREATE_RESOURCE}_PENDING`:
    case `${GET_ALL_RESOURCES}_PENDING`:
    case `${GET_RESOURCES_FOR_USER}_PENDING`:
    case `${GET_RESOURCE}_PENDING`:
    case `${GET_EDITOR_RESOURCES}_PENDING`:
    case `${UPDATE_RESOURCE}_PENDING`:
    case `${DELETE_RESOURCE}_PENDING`:
    case `${CHANGE_RESOURCE_STATUS}_PENDING`:
    case `${RESOURCE_PAYMENT}_PENDING`:
    case `${GET_ADMIN_RESOURCES}_PENDING`:
      return { ...state, loading: true, 
        createResourceError: null,
        allResourcesError: null,
        userResourcesError: null,
        editorResourcesError: null,
        getResourceError: null,
        updateResourceError: null,
        deleteResourceError: null,
        changeResourceStatusError: null,
        paidResourceError: null,
        adminResourcesError: null
      };
    
    case `${CREATE_RESOURCE}_FULFILLED`:
      createResource = action.payload.data;
      return { ...state, loading: false, createResource };
    case `${GET_ALL_RESOURCES}_FULFILLED`:
      allResources = action.payload.data.data;
      return { ...state, loading: false, allResources };
    case `${GET_RESOURCES_FOR_USER}_FULFILLED`:
      userResources = action.payload.data.data;
      return { ...state, loading: false, userResources };
    case `${SET_RESOURCE}`:
      setResource = action.payload;
      return { ...state, loading: false, setResource };
    case `${GET_RESOURCE}_FULFILLED`:
      getResource = action.payload.data;
      return { ...state, loading: false, getResource };
    case `${GET_EDITOR_RESOURCES}_FULFILLED`:
      editorResources = action.payload.data;
      return { ...state, loading: false, editorResources };
    case `${UPDATE_RESOURCE}_FULFILLED`:
      updateResource = action.payload.data;
      return { ...state, loading: false, updateResource };
    case `${DELETE_RESOURCE}_FULFILLED`:
      deleteResource = action.payload.data;
      return { ...state, loading: false, deleteResource };
    case `${CHANGE_RESOURCE_STATUS}_FULFILLED`:
      changeResourceStatus = action.payload.data;
      return { ...state, loading: false, changeResourceStatus };
    case `${RESOURCE_PAYMENT}_FULFILLED`:
      paidResource = action.payload.data;
      return { ...state, loading: false, paidResource };
    case `${GET_ADMIN_RESOURCES}_FULFILLED`:
      adminResources = action.payload.data;
      return { ...state, loading: false, adminResources };

    case `${CREATE_RESOURCE}_REJECTED`:
      return { ...state, loading: false, createResourceError: action.payload.data, state: initialState };
    case `${GET_ALL_RESOURCES}_REJECTED`:
      return { ...state, loading: false, allResourcesError: action.payload.data, state: initialState };
    case `${GET_RESOURCES_FOR_USER}_REJECTED`:
      return { ...state, loading: false, userResourcesError: action.payload.data, state: initialState };
    case `${GET_RESOURCE}_REJECTED`:
      return { ...state, loading: false, getResourceError: action.payload.data, state: initialState };
    case `${GET_EDITOR_RESOURCES}_REJECTED`:
      return { ...state, loading: false, editorResourcesError: action.payload.data, state: initialState };
    case `${UPDATE_RESOURCE}_REJECTED`:
      return { ...state, loading: false, updateResourceError: action.payload.data, state: initialState };
    case `${DELETE_RESOURCE}_REJECTED`:
      return { ...state, loading: false, deleteResourceError: action.payload.data, state: initialState };
    case `${CHANGE_RESOURCE_STATUS}_REJECTED`:
      return { ...state, loading: false, changeResourceStatusError: action.payload.data, state: initialState };
    case `${RESOURCE_PAYMENT}_REJECTED`:
      return { ...state, loading: false, paidResourceError: action.payload.data, state: initialState };
    case `${GET_ADMIN_RESOURCES}_REJECTED`:
      return { ...state, loading: false, adminResourcesError: action.payload.data, state: initialState };
    
    default:
      return state;
  }
}

export default resourceReducer;