import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  declare var RazorPay : any

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  //private baseUrl = 'http://localhost:9292/educare/order/';
  private baseUrl = 'http://103.93.16.19:33047/hayateducare-1.0/order/';
  createOrder(order): Observable<any> {
    return this.http.post(this.baseUrl + 'order', {
    customerName: order.name,
    email: order.email,
    phoneNumber: order.phone,
    amount: order.amount,
    courseId: order.courseId,
    userId: order.userId, 
    status: "Created"
    }, httpOptions);
}

  updateOrder(order): Observable<any> {
      return this.http.put(this.baseUrl + 'order', {
      razorpayOrderId: order.razorpay_order_id,
      razorpayPaymentId: order.razorpay_payment_id,
      razorpaySignature: order.razorpay_signature,
      status: "Success"
      }, httpOptions);
  }

  updateOrderFailure(order): Observable<any> {
    return this.http.post(this.baseUrl + 'failedPayment', {
      errCode: order.code,
      errSource: order.source,
      errDescp: order.desc,
      errStep: order.step,
      errReason: order.reason,
      errOrderId: order.orderId, 
      errPaymentId: order.paymentId,
      errUserId: order.userId
    }, httpOptions);
}

}
