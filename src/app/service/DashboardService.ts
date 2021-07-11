import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://www.dev.jvmhost.net/hayateducare-1.0/dashboard';

  constructor(private http: HttpClient) { }

  getAllCourses(student: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/courses`,student);
  }

  getMyLearnings(student: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/studentDash`,student);
  }

  purchaseCourse(scm : Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/purchaseCourse`,scm);
  }

  getPlaylist(course: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/playlist`,course);
  }

  saveEnquiry(enquiry: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/enquiry`,enquiry);
  }

  checkPurchaseStatus(scm: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/purchaseStatus`,scm);
  }
  
}