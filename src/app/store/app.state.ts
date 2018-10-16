import { ISessionStore, sessionInitialState, sessionReducer } from './state/session.state';

export interface IAppStore {
  session: ISessionStore;
}

export const AppInitialState: IAppStore = {
  session: sessionInitialState
};

export const rootReducer = {
  session: sessionReducer
};
