import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { SongModel } from './song-list.model';
import { SongService } from 'src/app/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {


  formValue !: FormGroup;
  songModelObj : SongModel = new SongModel();
  songData !:any;


  constructor(private formbuilder: FormBuilder,
          private api : SongService) { 

            this.songData ='';
          }

  ngOnInit(): void {

    this.formValue = this.formbuilder.group({

      Name :[''],
      Album:['']
    })

    this.getAllSong();
  }

  postSongDetails()
  {
    this.songModelObj.Name = this.formValue.value.Name;
    this.songModelObj.Album = this.formValue.value.Album;

    this.api.postSong(this.songModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Song added successfully")
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllSong();

    },
    err=>{
      alert("Something wrong")
    })
  }

  getAllSong()
  {
    this.api.getSong()
    .subscribe(res=>{
      this.songData = res;
    })
  }

  deleteSongData(row: any)
  {
    this.api.deleteSong(row.id)
    .subscribe(res=>{
      
      console.log(row.id);
      alert("Song deleted");
      this.getAllSong();
    })
  }

  editSong(row : any)
  {
    this.songModelObj.id = row.id;
    this.formValue.controls['Name'].setValue(row.Name);
    this.formValue.controls['Album'].setValue(row.Album);
    //this.updateSongDetails();
  }

  updateSongDetails()
  {
    
    this.songModelObj.Name = this.formValue.value.Name;
    this.songModelObj.Album = this.formValue.value.Album;

    this.api.updateSong(this.songModelObj,this.songModelObj.id)
    .subscribe(res=>{
      alert("Updated successfully");
      this.formValue.reset();
      this.getAllSong();
    })
  }

 openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
 closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
}
