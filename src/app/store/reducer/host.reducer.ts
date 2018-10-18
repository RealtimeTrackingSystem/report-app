import { tassign } from 'tassign';
import { IHostStore } from '../state/host.state';

export function getHosts (state: IHostStore) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state,
    error: null,
    loading: true
  });
}

export function getHostsSuccess (state: IHostStore, action) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state,
    loading: false,
    error: null,
    hosts: action.payload.hosts,
    limit: action.payload.limit,
    page: action.payload.page,
    count: action.payload.count
  });
}

export function getHostsError (state: IHostStore, action) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state,
    loading: false,
    error: action.payload.error
  });
}

export function getHostDetail (state: IHostStore) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state,
    loading: true,
    error: null
  });
}

export function getHostDetailSuccess (state: IHostStore, action) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state,
    loading: false,
    hostDetail: action.payload.hostDetail,
    error: null
  });
}

export function getHostDetailError (state: IHostStore, action) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state,
    loading: false,
    error: action.payload.error
  });
}
