import { CHARGE_AMOUNT, CHARGE_RESOURCE_AMOUNT,GET_PAYMENTS } from '../actions/index';

const initialState = {
  chargeamount: '',
  chargeresouceamount: '',
  getallpayments: [],
  chargeamountError: null,
  chargeresouceamountError: null,
  getallpaymentsError: null
};

function paymentReducer(state = initialState, action) {
  let chargeamount, chargeresouceamount, getallpayments;

  switch (action.type) {
    case `${CHARGE_AMOUNT}_PENDING`:
    case `${CHARGE_RESOURCE_AMOUNT}_PENDING`:
    case `${GET_PAYMENTS}_PENDING`:
      return { ...state, loading: true, 
        chargeamountError: null,
        chargeresouceamountError: null,
        getallpaymentsError: null
      };
    
    case `${CHARGE_AMOUNT}_FULFILLED`:
      chargeamount = action.payload.data;
      return { ...state, loading: false, chargeamount };
    case `${CHARGE_RESOURCE_AMOUNT}_FULFILLED`:
      chargeresouceamount = action.payload.data;
      return { ...state, loading: false, chargeresouceamount };
    case `${GET_PAYMENTS}_FULFILLED`:
      getallpayments = action.payload.data.data;
      return { ...state, loading: false, getallpayments };

    case `${CHARGE_AMOUNT}_REJECTED`:
      return { ...state, loading: false, chargeamountError: action.payload.data, state: initialState };
    case `${CHARGE_RESOURCE_AMOUNT}_REJECTED`:
      return { ...state, loading: false, chargeresouceamountError: action.payload.data, state: initialState };
    case `${GET_PAYMENTS}_REJECTED`:
      return { ...state, loading: false, getallpaymentsError: action.payload.data, state: initialState };
    
    default:
      return state;
  }
}

export default paymentReducer;