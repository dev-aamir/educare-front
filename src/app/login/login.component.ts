import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../model/student';
import { StateService } from '../service/StateService';
import { StudentService } from '../service/StudentService';
//import { AlertService } from '../_alert/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  student: Student = new Student();
  error : Boolean;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  
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
        else{
          this.studentState.setStudentState(data);
        
          this.router.navigateByUrl("/dashboard");
        }
      },
      error =>{
        console.log("***** Login ERROR *****");
        console.log(error);
      })
  }

}
