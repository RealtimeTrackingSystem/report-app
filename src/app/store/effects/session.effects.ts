import { ISession } from './../../interfaces/session/session.interface';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SessionActionTypes, LoginAction, SignupAction, LogoutAction, SessionCheckAction } from '../state/session.state';
import { SessionService } from '../../services/session.service';

@Injectable()
export class SessionEffects {
  constructor (
    private actions: Actions,
    private sessionService: SessionService
  ) {}

  @Effect()
    login
      = this.actions
        .pipe(
          ofType(SessionActionTypes.LOGIN),
          map((action: LoginAction) => action),
          switchMap((action: LoginAction) => {
            return this.sessionService.createSession(action.loginName, action.password)
              .pipe(
                catchError(error => of(error.error)),
                tap((response: any) => {
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
    signup
      = this.actions
        .pipe(
          ofType(SessionActionTypes.SIGNUP),
          map((action: SignupAction) => action),
          switchMap((action: SignupAction) => {
            return this.sessionService.signup(action.newUser)
              .pipe(
                catchError(error => of(error.error)),
                tap((response: any) => {
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
  @Effect()
    logout
      = this.actions
        .pipe(
          ofType(SessionActionTypes.LOGOUT),
          map((action: LogoutAction) => action),
          switchMap((action: LogoutAction) => {
            return this.sessionService.logout();
          }),
          catchError(error => of(error)),
          map((error) => {
            if (error) {
              return {
                type: SessionActionTypes.LOGOUT_ERROR,
                payload: {
                  error: 'Unable to Logout this time'
                }
              };
            } else {
              return {
                type: SessionActionTypes.LOGOUT_SUCCESS
              };
            }
          })
        );
  @Effect()
    sessionCheck
      = this.actions
        .pipe(
        ofType(SessionActionTypes.SESSION_CHECK),
        map((action: SessionCheckAction) => action),
        switchMap((action: SessionCheckAction) => {
          return this.sessionService.getSession;
        }),
        map((session: ISession) => {
          if (session) {
            return {
              type: SessionActionTypes.SESSION_CHECK_SUCCESS,
              payload: session
            };
          } else {
            return {
              type: SessionActionTypes.SESSION_CHECK_ERROR,
              payload: {
                error: 'Unauthorized User'
              }
            };
          }
        })
      );
}
