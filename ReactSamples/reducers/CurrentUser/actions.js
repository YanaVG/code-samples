import apiClient from 'config/apiClient';
import CurrentUser from './constants';


const acceptInvitationSuccess = (data) => (
  {
    type: CurrentUser.Invitation.ACCEPT_SUCCESS,
    data
  }
);

export const switchIdentityStart = () => ({
  type: CurrentUser.Switch.START
});

export const switchIdentityFailure = error => ({
  type: CurrentUser.Switch.FAILURE,
  error
});

export const switchIdentitySuccess = data => ({
  type: CurrentUser.Switch.SUCCESS,
  data
});

export const onboardingStart = () => ({
  type: CurrentUser.Onboarding.START
});

export const onboardingSuccess = (data) => (
  {
    type: CurrentUser.Onboarding.SUCCESS,
    data
  }
);
export const onboardingFailure = (error) => ({
  type: CurrentUser.Onboarding.FAILURE,
  error
});

export const switchIdentity = (id) =>
  (dispatch) => {
    dispatch(switchIdentityStart());
    apiClient.patch('my/current_identity', { params: { id } })
      .then((data) => dispatch(switchIdentitySuccess(data)))
      .catch(({error}) => dispatch(switchIdentityFailure(error)));
  };

export const logout = () =>
  (dispatch) => (
    apiClient.delete('users/sign_out', { prefix: '' })
      .then(data => location.pathname = "/")
      .catch(err => location.pathname = "/")
  );

export const acceptInvitation = ({code}) =>
  (dispatch) => (
    apiClient.put('/invitations/pending', {body: {code}})
      .then((data) => dispatch(acceptInvitationSuccess(data)))
      .catch(({errors}) => Promise.reject(errors))
  );

export const updateExpert = (formData) =>
  (dispatch) => {
    dispatch(onboardingStart());
    apiClient.put('/my/expert', { body: formData })
      .then((data) => dispatch(onboardingSuccess(data)))
      .catch((error) => dispatch(onboardingFailure(error)))
  };
