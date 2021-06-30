import axios from "axios";
import { CHARGE_AMOUNT, CHARGE_RESOURCE_AMOUNT,GET_PAYMENTS } from './index';

export function chargeAmount(paymentInformation) {
  return {
    type: CHARGE_AMOUNT,
    payload: axios.post(`${process.env.REACT_APP_API_STG_URL}/api/payment/charge`, paymentInformation, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  };
}

export function chargeResourceAmount(paymentInformation) {
  return {
    type: CHARGE_RESOURCE_AMOUNT,
    payload: axios.post(`${process.env.REACT_APP_API_STG_URL}/api/payment/chargeResource`, paymentInformation, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  };
}

export function getPayments() {
  return {
    type: GET_PAYMENTS,
    payload: axios.get(`${process.env.REACT_APP_API_STG_URL}/api/payment/payments`, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  };
}