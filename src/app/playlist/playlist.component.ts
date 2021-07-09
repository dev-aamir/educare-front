import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Playlist } from '../model/playlist';
import { DashboardService } from '../service/DashboardService';
import { StateService } from '../service/StateService';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private dashService : DashboardService, private router : Router,
    private studentState : StateService) { }

  student = this.studentState.getStudentState();

  playlist : Observable<Playlist[]>

  descText : String = "This is some desc about video and notes available";
  playVideoName : String = "Physics - Lecture 1";

  ngOnInit(): void {
    this.getPlaylist();
  }
  

  playVideo(play : Playlist){
    console.log("***** "+play.playlistVideoLink);
    //var src = "/assets/playlist/video"+id+".mp4";
    //var poster = "/assets/playlist/videosnap"+id+".jpeg";
    
    var src = play.playlistVideoLink;
    //var poster = "/assets/playlist/videosnap"+id+".jpeg";
    
    document.getElementById("my-player").setAttribute("src", src);

    this.descText = play.playlistDesc;
    this.playVideoName = play.playlistName;
  
  }

  getPlaylist(){
    var obj = {
      "courseId" : 4
    }

    this.dashService.getPlaylist(obj)
      .subscribe(data =>{
        console.log(data);
        if(data.length > 0){
          this.playlist = data;
        }
      },
      error =>{
        console.log("***** Playlilst ERROR *****");
        console.log(error);
      })
  }

  doubtList : Array<{}> = [];
  question : string;
  askDoubt(){
    if(this.question != null){
      var obj = {
        "quest" : this.question,
        "answer" : "Awating for response, we will get back to you surely."
      }

      this.doubtList.push(obj);
      localStorage.setItem("doubtList",JSON.stringify(this.doubtList));
    }
  }


}
