import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudentResponse } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = "http://localhost:8080/api/v1/students"

  constructor(private http: HttpClient) { }

  searchStudents(): Observable<IStudentResponse[]> {
    return this.http.get<IStudentResponse[]>(this.apiUrl);
  }

}
