import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { Standard } from '../model/standard';
import { Student } from '../model/student';
import { DashboardService } from '../service/DashboardService';
import { StateService } from '../service/StateService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  courseList : Observable<Course[]>;
  courseList1 : Observable<Course[]>;
  
    
  

  constructor(private dashboardService : DashboardService, private router : Router,
    private dashStateServie : StateService) { }


  student : Student = this.dashStateServie.getStudentState();
  
  
  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    
    console.log("******",this.student);
   
    var obj = {
      "standardYear" : this.student.studentStandard
    }

    this.courseList = this.dashboardService.getAllCourses(obj);

    this.courseList1 = this.dashboardService.getMyLearnings(this.student);

  }

  buyCourse(event){
    console.log("Buy course "+event);
    console.log(event.srcElement.id);
    var courseId = event.srcElement.id;

    var obj = {
      "studentId" : this.student.studentId,
      "courseId" : courseId
    }

    this.dashboardService.purchaseCourse(obj)
      .subscribe(data =>{
        console.log(data);
        if(data.length > 0){
          this.router.navigate(['/myboard']);
        }
      },
      error =>{
        console.log("***** Purchase ERROR *****");
        console.log(error);
      })

  }
}
