import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../model/student';
import { StateService } from '../service/StateService';
import { StudentService } from '../service/StudentService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  student: Student = new Student();
  
  constructor(private studentService : StudentService, private router : Router,
        private studentState : StateService) { }

  ngOnInit(): void {
  }

  createAccount(){
    this.studentService.createAccount(this.student)
      .subscribe(data =>{
        console.log(data);
        if(data != null){
          this.studentState.setStudentState(data);
          console.log("success");
          this.router.navigate(['/dashboard']);
        }
      },
      error =>{
        console.log("***** Signup ERROR *****");
        console.log(error);
      })
  }

}
