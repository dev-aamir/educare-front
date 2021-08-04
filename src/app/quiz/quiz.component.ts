import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../model/student';
import { QuizService } from '../service/quiz.service';
import { StateService } from '../service/StateService';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizQuestion : string;
  quizOption1 : string;
  quizOption2 : string;
  quizOption3 : string;
  quizOption4 : string;
 
  answerSubmitted : number;

  quizResult : any;

  //btnName = "Start Exam";

  started = false;
  ended = false;
  next = false;
  showQuestion = false;
  computedResult = false;

  student : Student;

  constructor(private router : Router, public quizService : QuizService, private stateService : StateService) { }

  ngOnInit(): void {
    
    this.student = this.stateService.getStudentState();

    if(this.student == null){
      this.router.navigateByUrl("login");
    }

    var request = {
      "quizId" : this.quizService.quizId
    };

    this.quizService.seconds = 0;
    this.quizService.progress = 0;
    this.quizService.questNo = 0;

    this.quizService.getQuizQuestions(request).subscribe(
      (data:any) => {
        this.quizService.questions = data;
        console.log(data);
        //this.startTimer();
        //this.nextQuestion();
        //this.showFirstQuestion();
      }
    );

    

  }

  startTimer(){
    this.quizService.timer = setInterval(()=>{
      this.quizService.seconds++;
    }, 1000);
  }

  startExam(){
    this.startTimer();
    this.started = true;
    this.showQuestion = true;
    this.nextQuestion();
  }
  
  nextQuestion(){
    console.log(this.quizService.questNo);
    console.log(this.answerSubmitted);

    this.next = true;
    //this.started = true;
    //this.btnName = "Next Question";
   //console.log("Question No :"+this.quizService.questNo);
   //console.log("Exam Length :"+this.quizService.questions.length);

    if(this.quizService.questNo != 0 && (this.answerSubmitted == null || this.answerSubmitted == undefined)){
      console.log("Please select any one option");
    }else{
      if(this.quizService.questNo == this.quizService.questions.length-1){
        this.next = false;
        this.ended = true;
      }  

      if(this.quizService.questNo == this.quizService.questions.length){
        //console.log("In IFF");
        
        var response = {
          "questId": this.quizService.questions[this.quizService.questNo].questId,
          "questQuizId": this.quizService.questions[0].questQuizId,
          "answerSubmitted": this.answerSubmitted,
          "studentId": this.student.studentId,
          "timeTaken": this.quizService.seconds
        }
  
        this.quizService.response.push(response);
  
        this.answerSubmitted = null;
  
        localStorage.setItem("answers",JSON.stringify(this.quizService.response));
  
      }
      else{
        //console.log("In ELSE");
        var response = {
          "questId": this.quizService.questions[this.quizService.questNo].questId,
          "questQuizId": this.quizService.questions[0].questQuizId,
          "answerSubmitted": this.answerSubmitted,
          "studentId": this.student.studentId,
          "timeTaken": this.quizService.seconds
        }
  
        if(this.quizService.questNo != 0){
          this.quizService.response.push(response);
        }
        
  
        this.answerSubmitted = null;
        
            this.quizQuestion = this.quizService.questions[this.quizService.questNo].question;
            this.quizOption1 = this.quizService.questions[this.quizService.questNo].option1;
            this.quizOption2 = this.quizService.questions[this.quizService.questNo].option2;
            this.quizOption3 = this.quizService.questions[this.quizService.questNo].option3;
            this.quizOption4 = this.quizService.questions[this.quizService.questNo].option4;
  
            this.quizService.questNo++;
  
           
      }
    }

    
    
    
    
  }

  submitForResult(){

    console.log("Last Q :"+this.quizService.questNo);
    console.log("Length of Exam :"+this.quizService.questions.length);
    if(this.quizService.questNo == this.quizService.questions.length){
      console.log("In IFF of Submit");
      console.log(this.quizService.questions[this.quizService.questNo]);
      console.log(this.quizService.questions);
      var response = {
        "questId": this.quizService.questions[this.quizService.questNo-1].questId,
        "questQuizId": this.quizService.questions[0].questQuizId,
        "answerSubmitted": this.answerSubmitted,
        "studentId": this.student.studentId,
        "timeTaken": this.quizService.seconds
      }

      this.quizService.response.push(response);

      this.answerSubmitted = null;

      localStorage.setItem("answers",JSON.stringify(this.quizService.response));

    }

    clearInterval(this.quizService.timer);
    console.log("Time taken : "+this.quizService.seconds);

    var requestObj = JSON.parse(localStorage.getItem("answers"));

    console.log(requestObj);

    this.quizService.seconds = 0;

    this.computedResult = true;

    this.getResultForQuiz(this.quizService.seconds);
  }

  getResultForQuiz(timeTaken){

    var requestObj = JSON.parse(localStorage.getItem("answers"));
    
    this.quizService.getQuizResults(requestObj).subscribe(
      (data:any) => {
        console.log("Results");
        this.quizResult = data;
        console.log(data);
      }
    );

  }

  cancelExam(){
    localStorage.removeItem("answers");

    this.quizService.seconds = 0;
    this.quizService.progress = 0;
    this.quizService.questNo = 0;

    this.quizService.quizId = 0;

    clearInterval(this.quizService.timer);

    this.quizService.seconds = 0;

    this.router.navigateByUrl("practicehome");
  }

}
