import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Enquiry } from '../model/enquiry';
import { DashboardService } from '../service/DashboardService';
import { StateService } from '../service/StateService';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  enquiry : Enquiry = new Enquiry();
  error : Boolean;
  success : Boolean;
  successMsg : string;

  constructor(private dashboardService : DashboardService, private router : Router,
    private userStateService : StateService, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
  }

  saveEnquiry(){
    this.ngxService.start();
    if(this.enquiry.enquiryEmail == null || this.enquiry.enquiryMessage == null || this.enquiry.enquiryMobile == null){
        this.error = true;
        this.ngxService.stop();
      }else{
              this.dashboardService.saveEnquiry(this.enquiry)
            .subscribe(data =>{
              console.log(data);
              if(data != null){
                this.ngxService.stop(); 
               this.success = true;
               this.successMsg = "Thank you, we will respond you shortly !!"
                
               setTimeout(() => {
                this.router.navigate(['']);
               }, 3000);
               //this.router.navigate(['/signup']);
              
              }else{
                this.error = true;
                this.ngxService.stop();
              }
            },
            error =>{
              this.error = true;
              console.log("***** ERROR *****");
              console.log(error);
              this.ngxService.stop();
            })
        }
      }
  
}
