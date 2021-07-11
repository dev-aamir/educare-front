import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from './model/student';
import { StateService } from './service/StateService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  title = 'Educare';
  private subscription: Subscription;

  constructor(private router : Router,
    private studentState : StateService) { }

  student = this.studentState.getStudentState();

  ngOnInit(): void {
    this.subscription = this.studentState.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('key') && res.key === 'isLoggedIn' && res.value == true) {
        console.log("notified");
        console.log(res.value);
        this.student = this.studentState.getStudentState();

      }
    });
  } 

  logout(){
    this.student = null;
    this.studentState.setStudentState(null);
    localStorage.removeItem('student');
    this.router.navigate(['/login']);
  }  

  refreshHeader(){
    this.router.navigateByUrl('');
  }
}
