import { Injectable } from '@angular/core';
import { env } from '../../Environment/env';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

 constructor(private http: HttpClient) { }


  loadDashboardData(): Observable<any> {
    return this.http.get(`${env.baseApi}Dashboard/GetDashboardData`);
  }
}
