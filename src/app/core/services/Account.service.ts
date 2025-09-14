import { Injectable } from '@angular/core';
import { UserRegister } from '../models/Create/UserRegister';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from '../../Environment/env';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  // Register
  Register(formdata: FormData): Observable<any> {

    return this.http.post(`${env.baseApi}Account/Register`, formdata);
  }


  //Login
  Login(User: { UserNameOrEmail: string, Password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${env.baseApi}Account/Login`, User, { headers });
  }

  //Test
  Test(): Observable<any> {
    return this.http.get(`${env.baseApi}Enrollment/GetAllEnrollments`,);
  }

  DeleteAccount(id: string): Observable<any> {
    return this.http.delete(`${env.baseApi}Account/DeleteAccount/${id}`);
  }
}
