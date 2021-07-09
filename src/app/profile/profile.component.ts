import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { Student } from '../model/student';
import { DashboardService } from '../service/DashboardService';
import { StateService } from '../service/StateService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dashBoardService : DashboardService, private router : Router,
    private dashStateService : StateService) { }

  courseList : Observable<Course[]>
  student : Student 
  
  ngOnInit(): void{
    this.student = this.dashStateService.getStudentState();
    this.courseList = this.dashBoardService.getMyLearnings(this.student);
  }
  
  
 

}
