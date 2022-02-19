// Constants
import { INIT_STATE } from './constants';

export default function () {
  return {
    /** It's important to have a spread operator here, else any updates made
     * to the state is reflected back to constants and thus, logout doesn't work
     * in most of the browsers. Because on logout, we do resetEntireStore
     */
    ...INIT_STATE,
  };
}
