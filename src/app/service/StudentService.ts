import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  //private baseUrl = 'http://www.dev.jvmhost.net/hayateducare-1.0/student';
  private baseUrl = 'http://localhost:9293/educare/student';
  //private baseUrl = 'http://103.93.16.19:33047/hayateducare-1.0/student';

  constructor(private http: HttpClient) { }

  login(student: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`,student);
  }

  createAccount(student: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/enroll`, student);
  }

  saveDoubt(doubt: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/askDoubt`, doubt);
  }

  fetchDoubts(student: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/getDoubts`, student);
  }

  logout(student: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`,student);
  }
  
}