import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { Student } from '../model/student';
import { DashboardService } from '../service/DashboardService';
import { StateService } from '../service/StateService';

@Component({
  selector: 'app-quiz-dash',
  templateUrl: './quiz-dash.component.html',
  styleUrls: ['./quiz-dash.component.css']
})
export class QuizDashComponent implements OnInit {

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
    //console.log("****** MyBoard",this.student);
    this.courseList = this.dashboardService.getMyLearnings(this.student);
    console.log(this.courseList);
  }


  showTest(subjectName : string){
    localStorage.setItem("testSub",subjectName);
    this.router.navigateByUrl("/practicehome");  
  }

}
