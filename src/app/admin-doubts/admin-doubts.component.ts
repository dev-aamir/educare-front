import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Teacher } from '../model/Teacher';
import { AdminService } from '../service/AdminService';
declare var $ : any;

@Component({
  selector: 'app-admin-doubts',
  templateUrl: './admin-doubts.component.html',
  styleUrls: ['./admin-doubts.component.css']
})
export class AdminDoubtsComponent implements OnInit {

  teacher: Teacher = new Teacher();
  error : Boolean;
  errorMsg : string;
  doubtListDB : Observable<[]>;
  formdata;
  
  constructor(private adminService : AdminService, private router : Router) { }

  openAnswerModal(doubt)
  {
    this.formdata = new FormGroup({
      cname : new FormControl(doubt.cname),
      doubtQuest : new FormControl(doubt.doubtQuest),
      stuFname : new FormControl(doubt.stuFname),
      doubtAns : new FormControl("", [Validators.required]),
      id : new FormControl(doubt.id)
    });
    $("#answerModal").modal("show");
  }
  closeModal()
  {
    $("#answerModal").modal("hide");
    this.getDoubts();
  }

  ngOnInit(): void {
    this.getDoubts();
    this.formdata = new FormGroup({
      cname : new FormControl(""),
      doubtQuest : new FormControl(""),
      stuFname : new FormControl(""),
      doubtAns : new FormControl(""),
      id : new FormControl("")
    });
  }

  getDoubts(){
    this.adminService.getAllDoubts(this.teacher).subscribe(res =>{console.log(res); this.doubtListDB = res;});
    
  }
    
  submitAnswer(formdataSubmit){
    console.log(formdataSubmit);


        this.adminService.answerDoubt(formdataSubmit)
          .subscribe(data =>{
            console.log(data);
            if(data == null){
              this.error = true;
              this.errorMsg = "Service Error !";
              
            }
            else{
              if(data.message == "DB001"){
                this.closeModal();
              }else{
                this.error = true;
                this.errorMsg = "Error saving answer!";
                this.closeModal();
              }
              
            }
          },
          error =>{
            console.log("***** Doubt Error *****");
            //console.log(error);
            this.error = true;
            this.errorMsg = "Server Issue, Please try again in sometime!"
            //this.closeModal();
          
          });
      
  }

}
