const OPEN_LOGIN_FORM = 'OPEN_LOGIN_FORM';
const OPEN_SIGNUP_FORM = 'OPEN_SIGNUP_FORM';
const CLOSE_FORM = 'CLOSE_FORM';

const defaultState = {
  formOpen: false,
  type: ''
};

export const getLoginForm = () => ({ type: OPEN_LOGIN_FORM });
export const getSignupForm = () => ({ type: OPEN_SIGNUP_FORM });
export const clearForm = () => ({ type: CLOSE_FORM });


export default function (state = defaultState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case OPEN_LOGIN_FORM:
      newState.formOpen = true;
      newState.type = 'Login';
      break;
    case OPEN_SIGNUP_FORM:
      newState.formOpen = true;
      newState.type = 'Signup';
      break;
    case CLOSE_FORM:
      newState.formOpen = false;
      break;
    default:
      return state;
  }
  return newState;
}
