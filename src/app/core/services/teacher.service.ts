import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../Environment/env';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {


  constructor(private http: HttpClient) {}

  getTeachers(): Observable<any> {
    return this.http.get(`${env.baseApi}Teacher/GetAllTeachers`);
  }
  getTeacherList(): Observable<any> {
    return this.http.get(`${env.baseApi}Teacher/GetAllTeacherList`);
  }

  getTeacherById(id: string): Observable<any> {
    return this.http.get(`${env.baseApi}Teacher/GetTeacherById/${id}`);
  }

  getStudentsByTeacherId(id: string): Observable<any> {
    return this.http.get(`${env.baseApi}Teacher/GetEnrolledStudentsByTeacherId/${id}`);
  }
   delete(id: string): Observable<any> {
    return this.http.get(`${env.baseApi}Teacher/GetEnrolledStudentsByTeacherId/${id}`);
  }



}
