import { Action } from '@ngrx/store';
import { IHost } from '../../interfaces';
import * as hr from '../reducer/host.reducer';

export interface IHostStore {
  hosts: IHost[];
  hostDetail: IHost;
  limit: number;
  page: number;
  count: number;
  loading: boolean;
  error: string;
}

export const hostInitialState: IHostStore = {
  hosts: [],
  hostDetail: null,
  limit: 0,
  page: 0,
  count: 0,
  loading: false,
  error: null
};

export const HostActionTypes = {
  HOST_LIST: 'HOST_LIST',
  HOST_LIST_SUCCESS: 'HOST_LIST_SUCCESS',
  HOST_LIST_ERROR: 'HOST_LIST_ERROR',
  HOST_DETAILS: 'HOST_DETAILS',
  HOST_DETAILS_SUCCESS: 'HOST_DETAILS_SUCCESS',
  HOST_DETAILS_ERROR: 'HOST_DETAILS_ERROR'
};

export class HostListAction implements Action {
  type = HostActionTypes.HOST_LIST;
  constructor (
    public page: number = 0,
    public limit: number = 10,
    public filter = null) {}
}

export class HostDetailAction implements Action {
  type = HostActionTypes.HOST_DETAILS;
  constructor (
    public hostId: string
  ) {}
}

export function hostReducer (state: IHostStore = hostInitialState, action) {
  switch (action.type) {
    case HostActionTypes.HOST_LIST: return hr.getHosts(state);
    case HostActionTypes.HOST_LIST_ERROR: return hr.getHostsError(state, action);
    case HostActionTypes.HOST_LIST_SUCCESS: return hr.getHostsSuccess(state, action);
    case HostActionTypes.HOST_DETAILS: return hr.getHostDetail(state);
    case HostActionTypes.HOST_DETAILS_SUCCESS: return hr.getHostDetailSuccess(state, action);
    case HostActionTypes.HOST_DETAILS_ERROR: return hr.getHostDetailError(state, action);
    default: return state;
  }
}
