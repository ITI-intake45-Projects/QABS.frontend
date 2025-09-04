import { Injectable } from '@angular/core';
import { Student } from '../models/Details/Student';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { env } from '../../Environment/env';

@Injectable({
  providedIn: 'root'
})
export class StudentService {



  private jsonUrl = 'assets/data/students.json';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(`${env.baseApi}Student/GetAllStudents`);
  }
}


