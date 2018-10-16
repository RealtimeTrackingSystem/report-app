import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ISession } from '../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionURL = environment.API_URL + '/api/auth';
  public session: ISession;
  constructor(
    private storage: Storage,
    private http: HttpClient
  ) { }

  get getSession (): Observable<ISession> {
    return from(this.storage.get('session'))
            .pipe(
              map((result: string) => JSON.parse(result))
            );
  }

  setSession (session: ISession): Observable<ISession> {
    return from(this.storage.set('session', JSON.stringify(session)))
            .pipe(
              map((result: string) => JSON.parse(result)),
              tap(result => this.session = result)
            );
  }

  createSession (loginName: string, password: string) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.post(this.sessionURL + '/signin', { loginName, password }, {
      headers: headers
    });
  }

}