import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../Environment/env';
import { TeacherAvailabilityCreateVM } from '../models/Create/TeacherAvailabilityCreateVM';

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

   DeleteTeacher(id: string): Observable<any> {
    return this.http.delete(`${env.baseApi}Teacher/DeleteTeacher/${id}`);
  }

  createTeacherPayout(form : FormData) : Observable<any>{
    return this.http.post(`${env.baseApi}Teacher/CreatePayTeacherByCompletedSessions`, form);
  }

  addAvailability(slot :TeacherAvailabilityCreateVM) : Observable<any>{
        return this.http.post(`${env.baseApi}Teacher/CreateTeacherAvaliability`, slot);


  }

  deleteAvailability(id : number): Observable<any> {
    return this.http.delete(`${env.baseApi}Teacher/DeleteTeacherAvaliability/${id}`);
  }



}
