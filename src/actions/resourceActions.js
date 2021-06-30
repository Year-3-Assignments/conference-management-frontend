import axios from 'axios';
import { CREATE_RESOURCE, GET_ALL_RESOURCES, SET_RESOURCE, GET_RESOURCE, GET_EDITOR_RESOURCES, 
  UPDATE_RESOURCE, DELETE_RESOURCE, CHANGE_RESOURCE_STATUS, RESOURCE_PAYMENT, 
  GET_RESOURCES_FOR_USER, GET_ADMIN_RESOURCES } from './index';

export function createResource(resource) {
  return {
    type: CREATE_RESOURCE,
    payload: axios.post(`${process.env.REACT_APP_API_STG_URL}/api/resource/create`, resource, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  };
}

export function getAllResources() {
  return {
    type: GET_ALL_RESOURCES,
    payload: axios.get(`${process.env.REACT_APP_API_STG_URL}/api/resource/`)
  };
}

export function getResourcesForUser() {
  return {
    type: GET_RESOURCES_FOR_USER,
    payload: axios.get(`${process.env.REACT_APP_API_STG_URL}/api/resource/resource`, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  };
}

export function getResourceById(resource) {
  return {
    type: GET_RESOURCE,
    payload: axios.get(`${process.env.REACT_APP_API_STG_URL}/api/resource/${resource.id}`)
  };
}

export function setResource(resource) {
  return {
    type: SET_RESOURCE,
    payload: resource
  };
}

export function getEditorResources() {
  return {
    type: GET_EDITOR_RESOURCES,
    payload: axios.get(`${process.env.REACT_APP_API_STG_URL}/api/resource/editor/resources`, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  };
}

export function getAdminResources() {
  return {
    type: GET_ADMIN_RESOURCES,
    payload: axios.get(`${process.env.REACT_APP_API_STG_URL}/api/resource/admin/resources`, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  };
}

export function updateResource(resource) {
  return {
    type: UPDATE_RESOURCE,
    payload: axios.put(`${process.env.REACT_APP_API_STG_URL}/api/resource/update`, resource, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  };
}

export function chnageResourceState(resource) {
  return {
    type: CHANGE_RESOURCE_STATUS,
    payload: axios.put(`${process.env.REACT_APP_API_STG_URL}/api/resource/status/${resource.id}`, resource, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  }
}

export function resourcePayment(resource) {
  return {
    type: RESOURCE_PAYMENT,
    payload: axios.put(`${process.env.REACT_APP_API_STG_URL}/api/resource/paid/${resource.id}`, null, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  }
}

export function deleteResource(resource) {
  return {
    type: DELETE_RESOURCE,
    payload: axios.delete(`${process.env.REACT_APP_API_STG_URL}/api/resource/remove/${resource.id}`, null, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  }
}