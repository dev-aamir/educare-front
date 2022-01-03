import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderComponent } from 'ngx-ui-loader/lib/core/ngx-ui-loader.component';
import { Observable, Subscription } from 'rxjs';
import { Course } from './model/course';
import { Student } from './model/student';
import { DashboardService } from './service/DashboardService';
import { MasterStateService } from './service/MasterSateService';
import { StateService } from './service/StateService';
import { StudentService } from './service/StudentService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  title = 'Educare';
  private subscription: Subscription;
  private masterSub: Subscription;
  adminLogin : string;
  adminNav : boolean = false;



  constructor(public router : Router,
    private studentState : StateService, private studentService : StudentService, private masterState : MasterStateService) { }

  student = this.studentState.getStudentState();

  ngOnInit(): void {
    this.subscription = this.studentState.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('key') && res.key === 'isLoggedIn' && res.value == true) {
        //console.log("notified");
        //console.log(res.value);
        this.student = this.studentState.getStudentState();
      }
    });

    this.masterSub = this.masterState.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('key') && res.key === 'masterLogin' && res.value == true) {
        this.adminNav = true;
      }
    });
  } 

  logout(){
    
    this.studentService.logout(this.student).subscribe(res => console.log(res));
    
    this.student = null;
    this.studentState.setStudentState(null);
    localStorage.removeItem('student');
    localStorage.removeItem('courseId');
    localStorage.removeItem('courseDetails');
    localStorage.removeItem('learningCourseId');
    localStorage.removeItem('courseType');
    localStorage.removeItem('type');
    localStorage.removeItem('puchaseCourseId');


    this.router.navigate(['/login']);
  }  

  refreshHeader(){
    this.router.navigateByUrl('');
  }

  showCourseDetails(courseId:number, courseType:string){
    
    //console.log(courseToView.courseId);
    
    localStorage.setItem("courseId",""+courseId);
    localStorage.setItem("courseType",courseType);
    this.router.navigateByUrl('/details');
  }

  showNcertCourses(){
    localStorage.setItem("type","nsc");
    this.router.navigateByUrl("/showcase");
  }

  masterLogout(){
    this.masterState.notifyOther({key: 'masterLogin', value: false});
  }
}
