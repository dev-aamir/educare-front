import { Injectable } from '@angular/core';
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

  
}