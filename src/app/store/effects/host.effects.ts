import { HostDetailAction } from './../state/host.state';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HostActionTypes, HostListAction } from '../state/host.state';
import { HostService } from '../../services/host.service';

@Injectable()
export class HostEffects {
  constructor (
    private actions: Actions,
    private hostService: HostService
  ) {}
  private page: number;
  private limit: number;
  @Effect()
    hostList
      = this.actions
        .pipe(
          ofType(HostActionTypes.HOST_LIST),
          map((action: HostListAction) => action),
          switchMap((action: HostListAction) => {
            this.page = action.page;
            this.limit = action.limit;
            return this.hostService.getHosts(action.page, action.limit, action.filter);
          }),
          catchError(error => of(error.error)),
          map((response: any) => {
            if (response.statusCode === 0) {
              return {
                type: HostActionTypes.HOST_LIST_SUCCESS,
                payload: {
                  hosts: response.hosts,
                  count: response.count,
                  limit: this.limit,
                  page: this.page
                }
              };
            } else {
              return {
                type: HostActionTypes.HOST_LIST_ERROR,
                payload: {
                  error: response.message
                }
              };
            }
          })
        );
  @Effect()
    hostDetail
     = this.actions
        .pipe(
          ofType(HostActionTypes.HOST_DETAILS),
          map((action: HostDetailAction) => action),
          switchMap((action: HostDetailAction) => {
            return this.hostService.getHostById(action.hostId);
          }),
          catchError(error => of(error.error)),
          map((response: any) => {
            if (response.statusCode === 0) {
              return {
                type: HostActionTypes.HOST_DETAILS_SUCCESS,
                payload: {
                  hostDetail: response.host
                }
              };
            } else {
              return {
                type: HostActionTypes.HOST_DETAILS_ERROR,
                payload: {
                  error: response.message || 'Internal Server Error'
                }
              };
            }
          })
        );
}
