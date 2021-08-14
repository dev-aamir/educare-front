import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
  errorMsg : string;
  globalLogoutMsg : Boolean;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  
  constructor(private studentService : StudentService, private router : Router,
        private studentState : StateService, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
  }

  loginClick(){
    this.ngxService.start();
    if(this.student.studentUsername == null || this.student.studentPassword == null){
      this.error = true;
      this.ngxService.stop();
    }else{
      localStorage.removeItem('student');
      localStorage.removeItem('courseId');
      localStorage.removeItem('courseDetails');
      localStorage.removeItem('learningCourseId');
      localStorage.removeItem('courseType');
      localStorage.removeItem('type');
      localStorage.removeItem('puchaseCourseId');

      this.loginServiceCall();
    }
    
  }

  loginServiceCall(){
    this.studentService.login(this.student)
      .subscribe(data =>{
        console.log(data);
        if(data == null){
          this.error = true;
          this.errorMsg = "Invalid Credentials !"
          this.ngxService.stop();
        }
        else{
          if(data.message == "LE000"){
            this.error = true;
            this.errorMsg = "Your account is already logged in !"
            this.globalLogoutMsg = true;
            this.ngxService.stop();
          }else{
            this.studentState.setStudentState(data);
            this.studentState.notifyOther({key: 'isLoggedIn', value: true});
            this.router.navigateByUrl('/dashboard');
            this.ngxService.stop();
          }
        }
      },
      error =>{
        console.log("***** Login ERROR *****");
        console.log(error);
        this.error = true;
        this.errorMsg = "Server Issue, Please try again in sometime!"
        this.globalLogoutMsg = false;
        this.ngxService.stop();
      })
  }


  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  logoutFromAllDevices(){
    
    this.studentService.logoutFromAllDevices(this.student).subscribe(res => console.log(res));
    
    this.student = new Student();
    this.studentState.setStudentState(null);
    localStorage.removeItem('student');
    localStorage.removeItem('courseId');
    localStorage.removeItem('courseDetails');
    localStorage.removeItem('learningCourseId');
    localStorage.removeItem('courseType');
    localStorage.removeItem('type');
    localStorage.removeItem('puchaseCourseId');
    
    this.error = false;
    this.globalLogoutMsg = false;


    //this.router.navigate(['/login']);
  } 


}
