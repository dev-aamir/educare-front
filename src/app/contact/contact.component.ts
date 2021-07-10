import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Enquiry } from '../model/enquiry';
import { DashboardService } from '../service/DashboardService';
import { StateService } from '../service/StateService';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  enquiry : Enquiry = new Enquiry();
  error : Boolean;

  constructor(private dashboardService : DashboardService, private router : Router,
    private userStateService : StateService) { }

  ngOnInit(): void {
  }

  saveEnquiry(){
    if(this.enquiry.enquiryEmail == null || this.enquiry.enquiryMessage == null || this.enquiry.enquiryMobile == null){
        this.error = true;
      }else{
              this.dashboardService.saveEnquiry(this.enquiry)
            .subscribe(data =>{
              console.log(data);
              if(data != null){
                
                console.log("success");
                
                this.router.navigate(['/signup']);
              }else{
                this.error = true;
              }
            },
            error =>{
              this.error = true;
              console.log("***** ERROR *****");
              console.log(error);
            })
        }
      }
  
}
