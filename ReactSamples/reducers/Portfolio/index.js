import { toCamelCase } from 'case-converter';
import configureReducer from 'config/configureReducer';
import { fromJS, Map, List } from 'immutable';
import Portfolio from './constants';

const getDefaultState = () => (
  Map({
    portfolio: List(),
    loading: false
  })
);

const portfolio = configureReducer(getDefaultState(),
  {
    [Portfolio.Fetch.START](state) {
      return state.set('loading', true);
    },

    [Portfolio.Fetch.SUCCESS](state, action) {
      return fromJS({
        portfolio: toCamelCase(action.payload.transactions),
        loading: false
      });
    },

    [Portfolio.Fetch.FAILURE](state) {
      return state.set('loading', true);
    }
  });


export default portfolio;
