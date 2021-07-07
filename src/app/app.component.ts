import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from './model/student';
import { StateService } from './service/StateService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  title = 'Educare';
  
  constructor(private router : Router,
    private studentState : StateService) { }

  student = this.studentState.getStudentState();

  logout(){
    this.student = null;
    this.studentState.setStudentState(null);
    this.router.navigate(['/login']);
  }  
}
