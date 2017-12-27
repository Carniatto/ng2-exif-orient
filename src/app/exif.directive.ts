import { Directive,Input, OnInit, HostBinding,ElementRef, Renderer2 } from '@angular/core';

import * as EXIF from 'exif-js';

@Directive({
  selector: '[appExif]'
})
export class ExifDirective implements OnInit {
  @Input() appExif;

  @HostBinding('style.transform') transform;
  el: any;
  
  constructor(element: ElementRef, private render: Renderer2) {
    this.el = element.nativeElement;
  }

  ngOnInit() {
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.appExif, true);
    xhr.responseType = "arraybuffer";
    this.el.src = this.appExif
    
    xhr.onload = () => {
        var arrayBuffer = new Uint8Array(xhr.response);
        console.log(xhr.response)
        var exifData = EXIF.readFromBinaryFile(arrayBuffer.buffer);
        console.log(exifData, 'fuck')
        this.render.addClass(this.el, `orient-${exifData.Orientation}`);
    };

    xhr.send();

  }

}
