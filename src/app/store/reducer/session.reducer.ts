import { ISessionStore } from '../state/session.state';
import { tassign } from 'tassign';

export function login (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    session: null,
    loading: true,
    error: null
  });
}

export function loginSuccess (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    loading: false,
    session: action.payload,
    error: null
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

export function loginCheck (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    loading: false,
    session: action.payload,
    error: null
  });
}

export function loginCheckError (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    loading: false,
    error: action.payload.error
  });
}

export function loginDestroy (state: ISessionStore) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    loading: false,
    session: null,
    error: null
  });
}

export function loginDestroyError (state: ISessionStore) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    loading: false,
    session: null,
    error: null
  });
}

export function signup (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    session: null,
    loading: true,
    error: null
  });
}

export function signupSuccess (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    loading: false,
    session: action.payload,
    error: null
  });
}

export function signupError (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    loading: false,
    session: null,
    error: action.payload.error,
  });
}
