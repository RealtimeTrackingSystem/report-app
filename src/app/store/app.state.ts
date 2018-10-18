import { IHostStore, hostInitialState, hostReducer } from './state/host.state';
import { ISessionStore, sessionInitialState, sessionReducer } from './state/session.state';

export interface IAppStore {
  session: ISessionStore;
  host: IHostStore;
}

export const AppInitialState: IAppStore = {
  session: sessionInitialState,
  host: hostInitialState
};

export const rootReducer = {
  session: sessionReducer,
  host: hostReducer
};
