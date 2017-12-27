import { Component } from '@angular/core';
import * as EXIF from 'exif-js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  img;

  handleInputChange(e) {
    
    EXIF.getData(e.target.files.item(0), function() {
      console.log(EXIF.getTag(this, "Orientation"))
      console.log(arguments)
    })
    var reader = new FileReader();
    reader.onload = (e:any) => { this.img = e.target.result};
    reader.readAsDataURL(e.target.files.item(0));
  }
}
