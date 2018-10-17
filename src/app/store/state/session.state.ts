import { IUserNew } from './../../interfaces/user/user-new.interface';
import { Action } from '@ngrx/store';
import { ISession } from '../../interfaces';
import * as sessionReducers from '../reducer/session.reducer';

export interface ISessionStore {
  session: ISession;
  loading: boolean;
  error: string;
}

export const sessionInitialState: ISessionStore = {
  session: null,
  loading: false,
  error: null
};

export const SessionActionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_CHECK: 'LOGIN_CHECK',
  LOGIN_CHECK_ERROR: 'LOGIN_CHECK_ERROR',
  LOGIN_DESTROY: 'LOGIN_DESTROY',
  LOGIN_DESTROY_ERROR: 'LOGIN_DESTROY_ERROR',
  SIGNUP: 'SIGNUP',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_ERROR: 'SIGNUP_ERROR'
};

export class LoginAction implements Action {
  type = SessionActionTypes.LOGIN;
  session: ISession;

  constructor(
    public loginName,
    public password
  ) { }
}

export class SignupAction implements Action {
  type = SessionActionTypes.SIGNUP;
  session: ISession;

  constructor(
    public newUser: IUserNew
  ) {}
}

export function sessionReducer (state: ISessionStore = sessionInitialState, action: LoginAction) {
  switch (action.type) {
    case SessionActionTypes.LOGIN: return sessionReducers.login(state, action);
    case SessionActionTypes.LOGIN_SUCCESS: return sessionReducers.loginSuccess(state, action);
    case SessionActionTypes.LOGIN_ERROR: return sessionReducers.loginError(state, action);
    case SessionActionTypes.LOGIN_CHECK: return sessionReducers.loginCheck(state, action);
    case SessionActionTypes.LOGIN_CHECK_ERROR: return sessionReducers.loginCheckError(state, action);
    case SessionActionTypes.LOGIN_DESTROY: return sessionReducers.loginDestroy(state);
    case SessionActionTypes.LOGIN_DESTROY_ERROR: return sessionReducers.loginDestroyError(state);
    case SessionActionTypes.SIGNUP: return sessionReducers.signup(state, action);
    case SessionActionTypes.SIGNUP_SUCCESS: return sessionReducers.signupSuccess(state, action);
    case SessionActionTypes.SIGNUP_ERROR: return sessionReducers.signupError(state, action);
    default: return state;
  }
}
