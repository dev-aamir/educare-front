import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { Student } from '../model/student';
import { DashboardService } from '../service/DashboardService';
import { StateService } from '../service/StateService';
import { StudentService } from '../service/StudentService';
declare var $ : any;

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  constructor(private dashboardService : DashboardService, private router : Router,
    private dashStateService : StateService, private studentService : StudentService) { }


  formdata;
  courseList : Observable<Course[]>
  student : Student = this.dashStateService.getStudentState();
  doubtListDB : Observable<[]>;
  
  openPopup()
  {
    this.formdata = new FormGroup({
      Subject : new FormControl("", [Validators.required]),
      Question : new FormControl("", [Validators.required])
    });
    $("#myModal").modal("show");
  }
  closeModal()
  {
    $("#myModal").modal("hide");
    this.getAllDoubts();
  }
  ngOnInit()
  {

    if(this.student == null){
      this.router.navigateByUrl("/login");  
    }else{
      this.formdata = new FormGroup({
        Subject : new FormControl("", [Validators.required]),
        Question : new FormControl("", [Validators.required])
      });

      this.courseList = this.dashboardService.getMyLearnings(this.student);
    }
    
  }
  on_submit(fordata){
      if (this.formdata.invalid) {
          Object.keys(this.formdata.controls).forEach(key => {
            this.formdata.get(key).markAsTouched();
          });
      }else{
        console.log(fordata.Subject+" "+fordata.Question);
        var request = {
          studentId : this.student.studentId,
          courseId : fordata.Subject,
          doubtQuest : fordata.Question
        }
  
        this.studentService.saveDoubt(request).subscribe(res => console.log("Doubt saved"));
        
        this.closeModal();
      }
  }

  getAllDoubts(){
    var request = {
      studentId : this.student.studentId
    }
    this.studentService.fetchDoubts(request).subscribe(res => this.doubtListDB = res);

    
   // console.log(this.doubtListDB);
  }

}
