import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kobiton } from 'protractor/built/driverProviders';
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
  error : Boolean;
  constructor(private dashboardService : DashboardService, private router : Router,
    private dashStateServie : StateService) { }


  student : Student = this.dashStateServie.getStudentState();
  
  
  ngOnInit(): void {
    if(this.student == null){
      this.router.navigateByUrl("/login");  
    }else{
      this.reloadData();
    }
    
  }

  reloadData() {
    
    console.log("******",this.student);
   
    var obj = {
      "standardYear" : this.student.studentStandard
    }

    this.courseList = this.dashboardService.getAllCourses(obj);

  }

  buyCourse(event){
    console.log("Buy course "+event);
    console.log(event.srcElement.id);
    var courseId = event.srcElement.id;

    var obj = {
      "studentId" : this.student.studentId,
      "courseId" : courseId
    }

  
    this.dashboardService.checkPurchaseStatus(obj) .subscribe(data =>{
      console.log("Purchase status res :");
      console.log(data);
      if(data == null){
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
      }else{
        console.log("You have already purchased this product");
        this.error = true;
      }
    },
    error =>{
      console.log("*****  Purchase Status ERROR *****");
      console.log(error);
    }) 
    
    
   

  }
  
}
