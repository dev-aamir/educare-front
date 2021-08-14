import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { DashboardService } from '../service/DashboardService';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  displayDiv : number;
  courseType : string;
  courseList : Observable<Course[]>;

  constructor(private dashService : DashboardService, private router : Router) { }

  ngOnInit(): void {
    this.showCategoryCourses();
  }

  navigatorClick(divNum : number){
    this.displayDiv = divNum;
  }

  showCategoryCourses(){
    this.courseType = localStorage.getItem("type");
    var request = {
      "courseType" : this.courseType
    }
    this.dashService.showCourses(request).subscribe(res => {this.courseList = res; console.log(this.courseList);});
    console.log(this.courseList);

  }

  showCourseDetails(courseToView : any){
    
    console.log(courseToView.courseId);
    
    localStorage.setItem("courseId",""+courseToView.courseId);
    localStorage.setItem("courseType",courseToView.courseType);
    this.router.navigateByUrl('/details');
  }







}
