import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { Student } from '../model/student';
import { DashboardService } from '../service/DashboardService';
import { StateService } from '../service/StateService';

@Component({
  selector: 'app-myboard',
  templateUrl: './myboard.component.html',
  styleUrls: ['./myboard.component.css']
})
export class MyboardComponent implements OnInit {

  constructor(private dashboardService : DashboardService, private router : Router,
    private dashStateService : StateService) { }

  courseList : Observable<Course[]>
  student : Student = this.dashStateService.getStudentState();
  
  
  ngOnInit(): void {

    if(this.student == null){
      this.router.navigateByUrl("/login");  
    }else{
      this.reloadData();
    }
    
  }

  reloadData() {
    console.log("****** MyBoard",this.student);
    this.courseList = this.dashboardService.getMyLearnings(this.student);
  }

  startLearning(course){
    console.log("start Learning");
    localStorage.setItem("learningCourseId", JSON.stringify(course));
    this.router.navigateByUrl("/playlist");
  }

  readNotes(course){
    console.log("start Learning");
    localStorage.setItem("learningCourseId", JSON.stringify(course));
    this.router.navigateByUrl("/note");
  }


}
