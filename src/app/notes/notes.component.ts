import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DashboardService } from '../service/DashboardService';
import { StateService } from '../service/StateService';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { Observable } from 'rxjs';
import { CourseDetails } from '../model/courseDetails';
import { Course } from '../model/course';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  courseDetails : Observable<[]>;
  pdfPath : String;
  course : Course;

  constructor(private dashboardService : DashboardService, private router : Router,
    private dashStateServie : StateService, private sanitizer: DomSanitizer) { 
      pdfDefaultOptions.assetsFolder = '/assets';
  }

  ngOnInit(): void {
    this.course = JSON.parse(localStorage.getItem("learningCourseId"));
    this.fetchData(this.course.courseId);

  }

  fetchData(courseId){
    var obj = {
      "courseId" : courseId
    }
    
    this.dashboardService.getAllNotesByCourse(obj).subscribe(data => {this.courseDetails = data; 
      console.log(data);
      this.getChapterPDF(data[0]);
    });
    console.log(this.courseDetails);

    

  }

  getChapterPDF(chapterInfo){
    //console.log("get Chapter");
    //console.log(chapterInfo);

    this.pdfPath = chapterInfo.chapterNotes;
    //console.log(this.pdfPath);

  }

}
