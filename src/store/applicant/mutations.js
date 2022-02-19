// Vue
import Vue from 'vue';

// Lodash
import assign from 'lodash/assign';

// Constants
import { INIT_STATE } from './constants';

export function setMultipleFields(storeState, payload) {
  assign(storeState, payload);
}

export function setField(storeState, { field, value }) {
  Vue.set(storeState, field, value);
}

export function resetState(storeState) {
  Object.keys(INIT_STATE).forEach((key) => Vue.set(storeState, key, INIT_STATE[key]));
}
