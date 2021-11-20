import axios from 'axios';

import {createNotification} from '../../utils/notification';

const API_ENDPOINT = process.env.REACT_APP_API_URL;

export const createAppointment = (payload) => {
  return async (dispatch) => {
    try{
      await axios.post(`${API_ENDPOINT}/appointment`, payload);
      createNotification('success', 'Successfully created appointment');
      dispatch(getAppointmentList());
    } catch (e) {
      createNotification('error', 'While creating appointment', e);
    }
  }
};

export const getAppointmentList = (params) => {
  return async (dispatch) => {
    try {
      const list = await axios.get(`${API_ENDPOINT}/appointment`, {params: params || {}});
      dispatch({
        type: 'SET_APPOINTMENT_LIST',
        payload: list.data
      });
      createNotification('success', 'Successfully retrieved appointment list');
    } catch (e) {
      createNotification('error', 'While retrieving appointment', e);
    }
  }

};

export const updateAppointmentStatus = (appointmentId, payload) => {
  return async (dispatch) => {
    try {
      await axios.put(`${API_ENDPOINT}/appointment/${appointmentId}/status-change`, payload);
      dispatch(getAppointmentList());
      createNotification('success', 'Successfully retrieved appointments');
    } catch (e) {
      createNotification('error', 'While retrieving appointment', e);
    }
  }
};
