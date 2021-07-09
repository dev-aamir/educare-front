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
    this.reloadData();
  }

  reloadData() {
    console.log("****** MyBoard",this.student);
    this.courseList = this.dashboardService.getMyLearnings(this.student);
  }

  gotoPlaylist(event){
      
  }

}
