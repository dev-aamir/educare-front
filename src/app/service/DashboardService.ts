import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  //private baseUrl = 'https://www.dev.jvmhost.net/hayateducare-1.0/dashboard';
  //private baseUrl = 'https://hayateducareapi.in/dashboard';
  //private baseUrl = 'http://103.93.16.19:33047/hayateducare-1.0/dashboard';
  private baseUrl = 'http://localhost:9293/educare/dashboard';

  constructor(private http: HttpClient) { }

  getAllCourses(student: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/courses`,student);
  }

  showCourses(course: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/showCourses`,course);
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

  getCourseDetails(course: Object): Observable<any>{
    return this.http.post(`${this.baseUrl}/courseDetails`,course);
  }

  getAllNotesByCourse(course: Object): Observable<any>{
    return this.http.post(`${this.baseUrl}/getNotes`,course);
  }
  
}