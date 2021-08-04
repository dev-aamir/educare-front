import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  seconds : number;
  timer;
  progress : number;
  questions : any[];
  questNo : number;
  response : any[] = [];

  quizList : any[];
  quizId : number;

  private baseUrl = 'http://localhost:9293/educare/quiz';

  constructor(private http: HttpClient) { }


  getQuizQuestions(quiz: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/getQuestions`,quiz);
  }

  getQuizResults(quiz: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/getQuizResult`,quiz);
  }

  displayTime(){
    return Math.floor(this.seconds / 3600) + ":" + Math.floor(this.seconds / 60) + ":" + Math.floor(this.seconds % 60)
  }

  getQuizList(student: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/getQuizes`,student);
  }
}
