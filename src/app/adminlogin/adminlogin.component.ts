import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from '../model/Teacher';
import { AdminService } from '../service/AdminService';
import { MasterStateService } from '../service/MasterSateService';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private adminService : AdminService, private router : Router, private masterState : MasterStateService) { }

  teacher: Teacher = new Teacher();
  error : Boolean;
  errorMsg : string;


  ngOnInit(): void {
    localStorage.setItem("adminLogin","true");
    this.masterState.notifyOther({key: 'masterLogin', value: true});
   
  }

  aaaadminLogin(){

  }

  adminLogin(){
    this.adminService.login(this.teacher)
      .subscribe(data =>{
        console.log(data);
        if(data == null){
          this.error = true;
          this.errorMsg = "Invalid Credentials !";
          
        }
        else{
          if(data.message == "TL001"){
            this.router.navigateByUrl('/masterDashboard');
          }else{
            this.error = true;
            this.errorMsg = "Invalid Credentials !";
          }
          
        }
      },
      error =>{
        console.log("***** Login ERROR *****");
        //console.log(error);
        this.error = true;
        this.errorMsg = "Server Issue, Please try again in sometime!"
       
      })
  }

}
