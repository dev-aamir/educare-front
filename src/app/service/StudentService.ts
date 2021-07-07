import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:9292/educare/student';

  constructor(private http: HttpClient) { }

  login(student: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`,student);
  }

  createAccount(student: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/enroll`, student);
  }

  
}