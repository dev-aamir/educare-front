import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
  error : Boolean;
  errorMessage : String;
  success : Boolean;
  successMsg : String;

  constructor(private studentService : StudentService, private router : Router,
        private studentState : StateService, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
  }

  createAccount(){
    this.ngxService.start();
    if(this.student.studentFirstName == null || this.student.studentMobile == null 
      || this.student.studentEmail == null 
      || this.student.studentUsername == null || this.student.studentPassword == null){
        this.error = true;
        this.ngxService.stop();
      }else{
        this.studentService.createAccount(this.student)
      .subscribe(data =>{
       // console.log(data);
        if(data != null){
          //this.studentState.setStudentState(data);
         // console.log(data.message);
          if(data.message == "SUE000"){
            this.error = true;
            this.errorMessage = "Email / Mobile / Username already exist";
            this.ngxService.stop();
          }else{
            this.ngxService.stop();
            this.success = true;
            this.successMsg = "You have been registered successfully!!"
            this.student = new Student();
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000); 
          }
        }else{
          this.error = true;
          this.errorMessage = "Server Issue, Please try again in sometime!!";
          this.ngxService.stop();
        }
      },
      error =>{
        this.error = true;
        this.errorMessage = "Server Issue, Please try again in sometime!!";
        console.log("***** Signup ERROR *****");
       // console.log(error);
        this.ngxService.stop();
        
      })
  }
      }
    

}
