import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { SessionActionTypes, LoginAction } from '../state/session.state';
import { SessionService } from '../../services/session.service';

@Injectable()
export class SessionEffects {
  constructor (
    private actions: Actions,
    private sessionService: SessionService
  ) {}

  @Effect()
  public login = this.actions.ofType(SessionActionTypes.LOGIN)
          .pipe(
            map((action: LoginAction) => action),
            switchMap((action: LoginAction) => {
              return this.sessionService.createSession(action.loginName, action.password)
                .pipe(
                  catchError(error => of(error.error)),
                  map((response: any) => {
                    if (response.statusCode > 0) {
                      return {
                        type: SessionActionTypes.LOGIN_ERROR,
                        payload: {
                          error: response.message
                        }
                      };
                    }
                    return response;
                  }),
                  map((response: any) => ({ type: SessionActionTypes.LOGIN_SUCCESS, payload: response.payload })),
                );
            })
          );
}
