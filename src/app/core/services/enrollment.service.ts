import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../Environment/env';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {



  constructor(private http: HttpClient) { }

  createEnrollment(formdata: FormData): Observable<any> {

    return this.http.post(`${env.baseApi}enrollment/CreateEnrollment`, formdata);
  }
  getAllEnrollments(query:any ): Observable<any> {
    return this.http.get(`${env.baseApi}Enrollment/search`,{ params: query });
  }

//   getStudents(page: number, pageSize: number, searchTerm:string): Observable<any> {
//   return this.http.get(`${env.baseApi}Student/SearchStudents?pageIndex=${page}&pageSize=${pageSize}&name=${searchTerm}`);
// }

  getEnrollmentById(id: number): Observable<any> {
  return this.http.get(`${env.baseApi}Enrollment/GetEnrollmentById/${id}`);
}

  // getStudents(): Observable<any> {
  //   return this.http.get(`${env.baseApi}Student/GetAllStudents`);
  // }

  // getStudentById(id: string): Observable<any> {
  //   return this.http.get(`${env.baseApi}Student/GetStudentById/${id}`);
  // }



  //   Register(formdata: FormData): Observable<any> {

  //   return this.http.post(`${env.baseApi}Account/Register`, formdata);
  // }
}

