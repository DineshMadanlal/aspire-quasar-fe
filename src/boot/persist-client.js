/** Our app is SSR - server side rendered
 * We use vuex and thus we need to persist our state on reload
 * For persist, we need to make use of localstorage(LS) and LS can't
 * be used when app is server side rendered.
 *
 * Thus, we do it this way. More info -> https://forum.quasar-framework.org/topic/3306/how-to-make-vuex-store-persist/9
 */
import createPersistedState from 'vuex-persistedstate';

// For encrypting the local storage
import SecureLS from 'secure-ls';

const ls = new SecureLS({
  isCompression: false,
});

export default async ({ store }) => {
  createPersistedState({
    key: 'aspire',
    paths: ['applicant'],
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  })(store);
};
