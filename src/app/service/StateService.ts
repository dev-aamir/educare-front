import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private studentObject : Student;

  constructor() { }

  setStudentState(student : Student){
    this.studentObject = student;
    localStorage.setItem("student",JSON.stringify(this.studentObject));
  }

  getStudentState() : Student{
    return this.studentObject = JSON.parse(localStorage.getItem("student"));
  }


  private notify = new Subject<any>();
  
  notifyObservable$ = this.notify.asObservable();


  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
  
}