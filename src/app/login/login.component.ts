import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../model/student';
import { StateService } from '../service/StateService';
import { StudentService } from '../service/StudentService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  student: Student = new Student();
  error : Boolean;
  
  constructor(private studentService : StudentService, private router : Router,
        private studentState : StateService) { }

  ngOnInit(): void {
  }

  loginClick(){
    if(this.student.studentUsername == null || this.student.studentPassword == null){
      this.error = true;
    }else{
      this.loginServiceCall();
    }
    
  }

  loginServiceCall(){
    this.studentService.login(this.student)
      .subscribe(data =>{
        console.log(data);
        if(data == null){
          this.error = true;
        }
        if(data.studentId > 0){
          this.studentState.setStudentState(data);
        
          this.router.navigate(['/dashboard']);
        }
      },
      error =>{
        console.log("***** Login ERROR *****");
        console.log(error);
      })
  }

}
