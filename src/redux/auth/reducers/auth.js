import { createReducer } from 'redux-act';
import {
  failFetchingLoginState,
  fetchUser,
  failFetchingUser,
  login,
  logout,
  failFetchingApi,
  fetchHello,
  newPasswordRequired,
  resetPasswordRequired,
} from '../actions/auth';

const initial = {
  auth: {
    isPrepared: false,
    isLoggedIn: false,
    newPasswordRequired: false,
    resetPassword: false,
    user: {
      project: '',
    },
    username: '',
    password: '',
    new_password: false, 
    reset: false,
    isFetching: false,
    error: undefined,
    jwt: '',
    hello: null,
    pathname: null
  }
};

const authReducer = createReducer({
  [failFetchingLoginState]: (state, payload) => Object.assign({}, initial, {
    isPrepared: true,
    pathname: payload.pathname
  }),
  [fetchUser]: state => Object.assign({}, state, {
    isFetching: true,
    error: undefined
  }),
  [failFetchingUser]: (state, err) => Object.assign({}, state, {
    isFetching: false,
    error: err
  }),
  [login]: (state, payload) => {
    return Object.assign({}, state, {
      isPrepared: true,
      isLoggedIn: true,
      user: payload.user || state.user,
      isFetching: false,
      resetPassword: false,
      newPasswordRequired: false,
      error: undefined,
      jwt: payload.jwt,
      pathname: payload.pathname
    });
  },
  [logout]: () => Object.assign({}, initial.auth, {
    isPrepared: true
  }),
  [failFetchingApi]: (state, err) => {
    return Object.assign({}, state, {
      error: err
    });
  },
  [fetchHello]: (state, payload) => {
    return Object.assign({}, state, {
      hello: payload
    });
  },
  [newPasswordRequired]: (state, payload) => {
    return Object.assign({}, state, {
      newPasswordRequired: true,
      username: payload.email,
      password: payload.password,
    })
  },
  [resetPasswordRequired]: (state, payload) => {
    console.log(state, payload)
    return Object.assign({}, state, {
      resetPassword: true,
      username: payload.email,
      password: payload.password,
      new_password: payload.new_password,
      reset: payload.reset,
    })
  }

}, initial.auth);

export default authReducer;
