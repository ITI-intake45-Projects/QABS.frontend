import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../Environment/env';
import { SessionEditVM } from '../models/Edit/SessionEditVM';
import { Session } from '../models/Details/Session';
import { SessionCreateVM } from '../models/Create/SessionCreateVM';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  getSessionsByStartDate(page: number, pageSize: number, startDate: string): Observable<any> {
    return this.http.get(`${env.baseApi}Session/SearchSessions?pageIndex=${page}&pageSize=${pageSize}&startDate=${startDate}`);
  }

  CancelSession(session: SessionEditVM): Observable<any> {
    return this.http.put(`${env.baseApi}Session/UpdateSession`, session);
  }

  createSession(session: SessionCreateVM): Observable<any> {
    return this.http.post(`${env.baseApi}Session/CreateSession`, session);
  }

    getCompletedSessionByTeacherId(id: string): Observable<any> {
    return this.http.get(`${env.baseApi}Session/GetCompletedSessionsByTeacherId/${id}`);
  }

}
