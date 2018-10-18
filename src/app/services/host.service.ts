import { ISession } from './../interfaces/session/session.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  private hostUrl = environment.API_URL + '/api/hosts';
  constructor(
    private sessionService: SessionService,
    private http: HttpClient
  ) {}

  getHosts (page: number = 0, limit: number = 10, filter = null): Observable<any> {
    let query = '?limit=' + limit + '&page=' + page;
    if (filter) {
      query += '&filter=' + filter;
    }
    return this.sessionService.getSession
      .pipe(
        switchMap((session: ISession) => {
          const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Authorization', session.token);
          return this.http.get(this.hostUrl + query, {
            headers: headers
          });
        })
      );
  }

  getHostById (id: string): Observable<any> {
    return this.sessionService.getSession
      .pipe(
        switchMap((session: ISession) => {
          const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Authorization', session.token);
          return this.http.get(this.hostUrl + '/' + id, {
            headers: headers
          });
        })
      );
  }

  sendHostRequest (id: string): Observable<any> {
    return this.sessionService.getSession
      .pipe(
        switchMap((session: ISession) => {
          const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Authorization', session.token);
          return this.http.post(this.hostUrl + '/requests/' + id, null, {
            headers: headers
          });
        })
      );
  }
}
