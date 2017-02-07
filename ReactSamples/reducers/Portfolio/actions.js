import apiClient from 'config/apiClient';
import Portfolio from './constants';

const portfolioFetchStart = () => (
  {
    type: Portfolio.Fetch.START
  }
);

const portfolioFetchFailure = (payload) => (
  {
    type: Portfolio.Fetch.FAILURE,
    payload
  }
);

const portfolioFetchSuccess = (payload) => (
  {
    type: Portfolio.Fetch.SUCCESS,
    payload
  }
);

export const fetchPortfolio = () =>
  (dispatch) => {
    dispatch(portfolioFetchStart());
    apiClient.get('my/transactions')
      .then((data) => dispatch(portfolioFetchSuccess(data)))
      .catch(({ errors }) => portfolioFetchFailure(errors));
  };
