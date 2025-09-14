import { Injectable } from '@angular/core';
import { Student } from '../models/Details/Student';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { env } from '../../Environment/env';

@Injectable({
  providedIn: 'root'
})
export class StudentService {





  constructor(private http: HttpClient) {}

getStudents(page: number, pageSize: number, searchTerm:string): Observable<any> {
  return this.http.get(`${env.baseApi}Student/SearchStudents?pageIndex=${page}&pageSize=${pageSize}&name=${searchTerm}`);
}

getStudentsNotpagination() : Observable<any>{
  return this.http.get(`${env.baseApi}Student/GetAllStudents`);
}
getStudentList() : Observable<any>{
  return this.http.get(`${env.baseApi}Student/GetAllStudentList`);
}


  getStudentById(id: string): Observable<any> {
    return this.http.get(`${env.baseApi}Student/GetStudentById/${id}`);
  }

}

