import { toCamelCase } from 'case-converter';
import configureReducer from 'config/configureReducer';
import { fromJS, Map } from 'immutable';
import CurrentUser from './constants';

const getDefaultState = (preloadedState = {}) =>
  fromJS({
    ...preloadedState,
    authenticated: Object.keys(preloadedState).length > 0,
    error: false,
    loading: false
  });


const currentUser = configureReducer(getDefaultState(toCamelCase(window.currentUser)), {
  [CurrentUser.Invitation.ACCEPT_SUCCESS](state, action) {
    return getDefaultState(action.data);
  },
  [CurrentUser.Switch.START](state) {
    return state.set('loading', true);
  },
  [CurrentUser.Switch.SUCCESS](state, { data }) {
    return fromJS({
      ...data,
      loading: false
    })

  },
  [CurrentUser.Switch.FAILURE](state, { error }) {
    return state
      .set('error', error)
      .set('loading', false);
  },
  [CurrentUser.Onboarding.START](state) {
    return state.set('loading', true);
  },
  [CurrentUser.Onboarding.SUCCESS](state, { data }) {
    return fromJS({
      ...data,
      loading: false
    })
  },
  [CurrentUser.Onboarding.FAILURE](state, { error }) {
    return state
      .set('error', error)
      .set('loading', false);
  }
});

export default currentUser;
