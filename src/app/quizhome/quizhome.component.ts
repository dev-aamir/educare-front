import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../model/student';
import { QuizService } from '../service/quiz.service';
import { StateService } from '../service/StateService';

@Component({
  selector: 'app-quizhome',
  templateUrl: './quizhome.component.html',
  styleUrls: ['./quizhome.component.css']
})
export class QuizhomeComponent implements OnInit {

  student : Student;
  constructor(public quizService : QuizService, private router : Router,
    private stateService : StateService) { }


  ngOnInit(): void {

    this.student = this.stateService.getStudentState();

    if(this.student == null){
      this.router.navigateByUrl("login");
    }

    var request = {
      "studentStandard" : this.student.studentStandard
    };

    this.quizService.getQuizList(request).subscribe(
      (data:any) => {
        this.quizService.quizList = data;
        //console.log(data);
        
      }
    );
  }

  goToTest(quizId){
    this.quizService.quizId = quizId;
    this.router.navigateByUrl("practice");
  }

}
