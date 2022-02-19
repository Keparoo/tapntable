import {
  ADD_TO_CHECK,
  CREATE_CHECK,
  LOAD_CURRENT_CHECK,
  CLEAR_CURRENT_CHECK,
  ADD_PAYMENT
} from './types';

// Handle async API call for list of blog titles

export function newCheck(check) {
  return {
    type: CREATE_CHECK,
    check
  };
}

export function addItemToCheck(item) {
  return {
    type: ADD_TO_CHECK,
    item
  };
}

export function getOpenCheck(check) {
  console.log('In action', check);
  return {
    type: LOAD_CURRENT_CHECK,
    check
  };
}

export function clearCurrentCheck() {
  return {
    type: CLEAR_CURRENT_CHECK
  };
}

export function addPayment(payment) {
  return {
    type: ADD_PAYMENT,
    payment
  };
}
