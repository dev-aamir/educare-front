import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  playVideo(id){
    console.log("***** "+id);
    var src = "/assets/playlist/video"+id+".mp4";
    var poster = "/assets/playlist/videosnap"+id+".jpeg";
    document.getElementById("my-player").setAttribute("src", src);
    //document.getElementById("my-player_html5_api").setAttribute("poster", poster);
    //document.getElementById("my-player").setAttribute("poster", poster);
    //document.getElementById("my-player").classList.add("vjs-playing");
    //document.getElementById("my-player_html5_api").click();
  }

}
