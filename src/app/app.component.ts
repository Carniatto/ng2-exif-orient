import { Component } from '@angular/core';
import * as EXIF from 'exif-js';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase';
import { OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  imgs = [];
  context;
  uploads = [];
  @ViewChild('cvs') canvas;

  constructor(element: ElementRef) {}

  ngOnInit() {

  }

handleInputChange(e) {

    let storageRef = firebase.storage().ref();
    let canvas = this.canvas.nativeElement;
    let file = e.target.files.item(0);
    let filename = file.name;
    let imgs = this.imgs;
    EXIF.getData(file,() => {

      let orient = EXIF.getTag(file, "Orientation")
      let angle = orient === 6 ? 90 :
                  orient === 3 ? 180 :
                  orient === 8 ? 270 : 0;
      console.log(orient, angle)
      let reader = new FileReader();
      reader.onload = (e:any) => {
        let img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          let context = canvas.getContext('2d')
          let wrh = img.width / img.height;
          let newWidth = canvas.width;
          let newHeight = newWidth / wrh;
          if (newHeight > canvas.height) {
              newHeight = canvas.height;
              newWidth = newHeight * wrh;
          }

          let offsetW = (canvas.width - newWidth)/2
          let offsetH = (canvas.height - newHeight)/2

          console.log(newHeight, newWidth)
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.save();
          context.translate(canvas.width/2, canvas.height/2);
          context.rotate(angle*Math.PI/180);
          context.drawImage(img, -newWidth/2, -newHeight/2, newWidth, newHeight);
          context.restore();
          imgs.push({url: canvas.toDataURL()})
        }
      };
      reader.readAsDataURL(e.target.files.item(0));
    })
  };

}
