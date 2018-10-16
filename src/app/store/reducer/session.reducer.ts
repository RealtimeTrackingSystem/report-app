import { ISessionStore } from '../state/session.state';
import { tassign } from 'tassign';

export function login (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    loading: true
  });
}

export function loginSuccess (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    loading: false,
    session: action.payload,
    error: null,
  });
}

export function loginError (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    loading: false,
    session: null,
    error: action.payload.error,
  });
}
