import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterStateService {

  
  constructor() { }

  
  private notify = new Subject<any>();
  
  notifyObservable$ = this.notify.asObservable();


  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
  
}