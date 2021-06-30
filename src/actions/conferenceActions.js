import axios from 'axios';
import { CREATE_CONFERENCE, GET_ALL_CONFERENCES, GET_CONFERENCE, SET_CONFERENCE, UPDATE_CONFERENCE, 
  DELETE_CONFERENCE, GET_CONFERENCES_FOR_ADMIN, SET_CONFERENCE_STATUS, GET_CONFERENCE_FOR_HOME_PAGE } from './index';

export function createConference(conference) {
  return {
    type: CREATE_CONFERENCE,
    payload: axios.post(`${process.env.REACT_APP_API_STG_URL}/api/conference/create`, conference, {
      headers: { 'Authorization': localStorage.getItem('Authorization') }
    })
  };
}

export function getAllConferences() {
  return {
    type: GET_ALL_CONFERENCES,
    payload: axios.get(`${process.env.REACT_APP_API_STG_URL}/api/conference/`)
  };
}

export function getConference(conference) {
  return {
    type: GET_CONFERENCE,
    payload: axios.get(`${process.env.REACT_APP_API_STG_URL}/api/conference/${conference.id}`)
  };
}

export function setConference(conference) {
  return {
    type: SET_CONFERENCE,
    payload: conference
  };
}

export function getConferencesForAdmin() {
  return {
    type: GET_CONFERENCES_FOR_ADMIN,
    payload: axios.get(`${process.env.REACT_APP_API_STG_URL}/api/conference`, {
      headers: { 'Authorization': localStorage.getItem('Authorization') }
    })
  };
}

export function updateConference(conference) {
  return {
    type: UPDATE_CONFERENCE,
    payload: axios.put(`${process.env.REACT_APP_API_STG_URL}/api/conference/update`, conference, {
      headers: { 'Authorization': localStorage.getItem('Authorization') }
    })
  };
}

export function updateConferenceStatus(conference) {
  return {
    type: SET_CONFERENCE_STATUS,
    payload: axios.put(`${process.env.REACT_APP_API_STG_URL}/api/conference/updatestatus`, conference, {
      headers: { 'Authorization': localStorage.getItem('Authorization') }
    })
  };
}

export function deleteConference(conference) {
  return {
    type: DELETE_CONFERENCE,
    payload: axios.delete(`${process.env.REACT_APP_API_STG_URL}/api/conference/delete/${conference.id}`, {
      headers: { 'Authorization': localStorage.getItem('Authorization') }
    })
  };
}

export function getConferenceForHomePage() {
  return {
    type: GET_CONFERENCE_FOR_HOME_PAGE,
    payload: axios.get(`${process.env.REACT_APP_API_STG_URL}/api/conference/conference/home`)
  }
}