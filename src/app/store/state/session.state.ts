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
  LOGIN_ERROR: 'LOGIN_ERROR'
};

export class LoginAction implements Action {
  type = SessionActionTypes.LOGIN;
  session: ISession;

  constructor (
    public loginName: string,
    public password: string
  ) {}
}

export function sessionReducer (state: ISessionStore = sessionInitialState, action: LoginAction) {
  switch (action.type) {
    case SessionActionTypes.LOGIN: return sessionReducers.login(state, action);
    case SessionActionTypes.LOGIN_ERROR: return sessionReducers.loginError(state, action);
    case SessionActionTypes.LOGIN_SUCCESS: return sessionReducers.loginSuccess(state, action);
    default: return state;
  }
}
