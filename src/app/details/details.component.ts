import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CourseDetails } from '../model/courseDetails';
import { Student } from '../model/student';
import { DashboardService } from '../service/DashboardService';
import { StateService } from '../service/StateService';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  private subscription: Subscription;
  
  courseDetails : Observable<CourseDetails[]>;

  constructor(private dashboardService : DashboardService, private router : Router,
    private dashStateServie : StateService) { }

  error : Boolean;
   courseId : number; 
    student : Student = this.dashStateServie.getStudentState();
  
  
    ngOnInit(): void {
      /*this.subscription = this.dashStateServie.notifyObservable$.subscribe((res) => {
        if (res.hasOwnProperty('key') && res.key === 'courseId') {
          console.log("notified for details");
          console.log(res.value);
          localStorage.setItem("courseId",res.value);
        }
      });
      */
      if(this.student == null){
        //this.router.navigateByUrl("/login");  
        this.reloadPage();
      }else{
        
        this.reloadPage();
      }
      
  
    }

    reloadPage(){
    
    this.courseId = Number.parseInt(localStorage.getItem("courseId"));
     
    console.log("course  Details of :"+this.courseId);
    
    var obj = {
      "courseId" : this.courseId
    }

    this.dashboardService.getCourseDetails(obj).subscribe(data => {this.courseDetails = data; 
      localStorage.setItem("courseDetails",data[0].cdCourseId+'^'+data[0].cdCourseName+'^'+data[0].cdCoursePrice)});
    console.log(this.courseDetails);
    }


    orderCourse(id){
      localStorage.setItem("puchaseCourseId",id);

      var obj = {
        "studentId" : this.student.studentId,
        "courseId" : id
      }
      this.dashboardService.checkPurchaseStatus(obj) .subscribe(data =>{
        console.log("Purchase status res in details page :");
        console.log(data);
        if(data == null){
         
          this.router.navigateByUrl("/order");
        }else{
          this.error = true;
          console.log("You have already purchased this product");
         
        }
      },
      error =>{
        console.log("*****  Purchase Status ERROR *****");
        console.log(error);
        
      });
    
    }

}