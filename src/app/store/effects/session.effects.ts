import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { SessionActionTypes, LoginAction, SignupAction } from '../state/session.state';
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
                  tap((response) => {
                    this.sessionService.setSession(response.payload);
                  }),
                  map((response: any) => {
                    if (response === 'Unauthorized') {
                      return {
                        type: SessionActionTypes.LOGIN_ERROR,
                        payload: {
                          error: 'Invalid Login Credentials'
                        }
                      };
                    } else if (response.statusCode > 0) {
                      return {
                        type: SessionActionTypes.LOGIN_ERROR,
                        payload: {
                          error: response.message
                        }
                      };
                    } else if (response.statusCode === 0) {
                      return {
                        type: SessionActionTypes.LOGIN_SUCCESS,
                        payload: response.payload
                      };
                    }
                  })
                );
            })
          );
  @Effect()
  public signup = this.actions.ofType(SessionActionTypes.SIGNUP)
            .pipe(
              map((action: SignupAction) => action),
              switchMap((action: SignupAction) => {
                return this.sessionService.signup(action.newUser)
                  .pipe(
                    catchError(error => of(error.error)),
                    tap((response) => {
                      this.sessionService.setSession(response.payload);
                    }),
                    map((response: any) => {
                      if (response === 'Unauthorized') {
                        return {
                          type: SessionActionTypes.SIGNUP_ERROR,
                          payload: {
                            error: 'Invalid Login Credentials'
                          }
                        };
                      } else if (response.statusCode > 0) {
                        return {
                          type: SessionActionTypes.SIGNUP_ERROR,
                          payload: {
                            error: response.message
                          }
                        };
                      } else if (response.statusCode === 0) {
                        return {
                          type: SessionActionTypes.SIGNUP_SUCCESS,
                          payload: response.payload
                        };
                      }
                    })
                  );
              })
            );
}
