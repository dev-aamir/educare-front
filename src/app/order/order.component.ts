import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../model/student';
import { OrderService } from '../service/order.service';
import { StateService } from '../service/StateService';

declare var Razorpay: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  student : Student; 
  form: any;
  paymentId: string;
  error: string;
  courseData : any;
  errResponse: any;
  
     
    constructor(private orderService: OrderService, private router : Router, private stateService : StateService) {
 
    }

  ngOnInit(): void {
    this.student = this.stateService.getStudentState();
    this.courseData = localStorage.getItem("courseDetails").split('^');
    console.log(this.courseData);
    this.form = {
      amount : this.courseData[2],
      name : this.student.studentFirstName,
      email : this.student.studentEmail,
      phone : this.student.studentMobile,
      userId : this.student.studentId,
      courseId : this.courseData[0] 
    }; 
  }


  options = {
    "key": "",
    "amount": "", 
    "name": "Hayat Educare",
    "description": "Course Purchase",
    "image": "/assets/hayat_logo.png",
    "order_id":"",
    "handler": function (response){
        var event = new CustomEvent("payment.success", 
            {
                detail: response,
                bubbles: true,
                cancelable: true
            }
        );    
        window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "#3399cc"
    }
    };


    onSubmit(): void {
      this.paymentId = ''; 
      this.error = ''; 
      this.orderService.createOrder(this.form).subscribe(
      data => {
          this.options.key = data.secretKey;
          this.options.order_id = data.razorpayOrderId;
          this.options.amount = data.applicationFee; //paise
          this.options.prefill.name = this.form.name;
          this.options.prefill.email = this.form.email;
          this.options.prefill.contact = this.form.phone;
          var rzp1 = new Razorpay(this.options);
          rzp1.open();
                     
          rzp1.on('payment.failed', function (response){    
              
              console.log(response.error.code);    
              console.log(response.error.description);    
              console.log(response.error.source);    
              console.log(response.error.step);    
              console.log(response.error.reason);    
              console.log(response.error.metadata.order_id);    
              console.log(response.error.metadata.payment_id);
             
              this.errResponse = {
                code : response.error.code,    
                desc: response.error.description,    
                source : response.error.source,    
                step : response.error.step,    
                reason : response.error.reason,   
                orderId : response.error.metadata.order_id,
                paymentId : response.error.metadata.payment_id,
                userId : this.student.studentId
              }
              this.orderService.updateOrderFailure(this.errResponse).subscribe(res => console.log("Failed"));

              this.error = response.error.reason;
          }
          );
      }
      ,
      err => {
          this.error = err.error.message;
      }
      );
  }

  @HostListener('window:payment.success', ['$event']) 
  onPaymentSuccess(event): void {
      this.orderService.updateOrder(event.detail).subscribe(
      data => {
          this.paymentId = data.message;
          this.router.navigateByUrl("/myboard");
      }
      ,
      err => {
          this.error = err.error.message;
      }
      );
  }

}
