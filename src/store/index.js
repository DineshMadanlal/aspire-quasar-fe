import Vue from 'vue';
import Vuex from 'vuex';

import applicant from './applicant';

Vue.use(Vuex);
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    // State
    state: {
      httpLoading: false,
    },
    // Mutations
    mutations: {
      setField(storeState, { field, value }) {
        storeState[field] = value;
      },
    },
    // Actions
    actions: {
      setLoading({ commit }, value) {
        commit('setField', {
          field: 'httpLoading',
          value,
        });
      },
      resetEntireStore({ commit }) {
        commit('applicant/resetState', {}, { root: true });
        return true;
      },
      async proxyAction({ dispatch }, {
        actionName, data, setLoading = true, showErrorToaster = false,
      }) {
        dispatch('setLoading', setLoading, { root: true });
        try {
          const response = await dispatch(actionName, data, { root: true });
          dispatch('setLoading', false, { root: true });
          /* If response is not ok, show either the custom message
            sent from BE or the constant BE API error message
          */
          if (showErrorToaster && !response.ok) {
            // eslint-disable-next-line no-underscore-dangle
            this._vm.$q.notify({
              position: 'top-right',
              type: 'negative',
              message: response.message || 'Something went wrong. Please try again later.',
            });
          }
          /* If response is not ok, show either the custom message
            sent from BE or the constant BE API error message
          */
          return response || { ok: true };
        } catch (e) {
          dispatch('setLoading', false, { root: true });
          return { ok: false };
        }
      },
    },
    modules: {
      applicant,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return Store;
}
