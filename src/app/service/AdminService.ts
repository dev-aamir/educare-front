import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //private baseUrl = 'https://hayateducareapi.in/student';
  //private baseUrl = 'https://www.dev.jvmhost.net/hayateducare-1.0/student';
  private baseUrl = 'http://localhost:9293/educare/admin';
  //private baseUrl = 'http://103.93.16.19:33047/hayateducare-1.0/student';

  constructor(private http: HttpClient) { }

  login(teacher: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/superLogin`,teacher);
  }

  getAllDoubts(teacher: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/getAllDoubts`,teacher);
  }

  answerDoubt(doubt : Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveDoubtAns`,doubt);
  }
  
}
