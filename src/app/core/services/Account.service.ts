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
  Register(Admin: UserRegister): Observable<any> {

    return this.http.post(`${env.baseApi}Account/Register`, Admin);
  }


  //Login
  Login(user: { identifier: string; password: string }): Observable<any> {
    return this.http.post(`${env.baseApi}Account/Login`, user);
  }

}
