import { Component, Input, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgFor } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'st-edit-image',
    templateUrl: 'app/components/editImage/editImage.component.html',
    styleUrls: ['app/components/editImage/editImage.component.css'],
    host: {
        '(window:click)': 'handleClick($event)',
        '(window: mousemove)': 'handleMouseMove($event)'
    }
})

export class editImageComponent {
  
    // constructor declarations
    constructor(private sanitizer:DomSanitizer, private ngZone: NgZone){}

    @Input() imageFile: Object;
    @ViewChild('imageCanvas') canvas: ElementRef;
    
    imageObject: any = null;
    editedImage: Object = null;
    imageContext: any = null;
    imageData: any = null;

    ngAfterViewInit() {
        this.displayImage(this.imageFile);
    }

    /**
     * @method displayImage
     * @param image-file
     * @description displays the image on a canvas
    */
    displayImage(image) {
        var img: any = new Image();
        this.imageContext = this.canvas.nativeElement.getContext('2d');
        if (image) {
            img.src = image.path;
            this.imageObject = img;
            this.imageContext.drawImage(img , 0, 0, img.width, img.height,
            0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
            this.imageData = this.imageContext.getImageData(0, 0, this.imageObject.width, this.imageObject.height);
        }
    }

    /**
     * @method imageBrightness
     * @param brightness-value
     * @description changes the brightness of the image depending
     * on value provided at the param
    */
    imageBrightness(value) {
        let imageData = this.imageData;
        let oldData = new Uint8ClampedArray(imageData.data);
        var image = imageData.data;
        value = value? parseInt(value) : 0;
        
        for(var i = 0; i < image.length; i+=4) {
            image[i] = (image[i] + value) < 255? ((image[i] + value) > 0? (image[i] + value) : 0)  : 255;
            image[i+1] = (image[i+1] + value) < 255? ((image[i+1] + value) > 0? (image[i+1] + value) : 0) : 255;
            image[i+2] = (image[i+2] + value) < 255? ((image[i+2] + value) > 0? (image[i+2] + value) : 0) : 255;
        }
        
        this.imageContext.putImageData(imageData, 0, 0, 0, 0, this.imageObject.width, this.imageObject.height);
        imageData.data.set(oldData);
    }

    /**
     * @method imageContrast
     * @param contrast-value
     * @description changes the contrast of the image depending
     * on value provided at the param
    */
    imageContrast(value) {
        let imageData = this.imageData;
        let oldData = new Uint8ClampedArray(imageData.data);
        var image = imageData.data;
        value = value? parseInt(value) : 0;
        var factor = (259 * (value + 255)) / (255 * (259 - value));
        
        for(var i = 0; i < image.length; i+=4) {
            image[i] = factor * (image[i] - 128) + 128;
            image[i+1] = factor * (image[i+1] - 128) + 128;
            image[i+2] = factor * (image[i+2] - 128) + 128;
        }
        
        this.imageContext.putImageData(imageData, 0, 0, 0, 0, this.imageObject.width, this.imageObject.height);
        imageData.data.set(oldData);
    }

    /**
     * @method imageCrop
     * @param 
     * @description crops the image
    */
    imageCrop() {
        
    }

    /**
     * @method imageResize
     * @param 
     * @description resize the image
    */
    imageResize() {
        
    }

    /**
     * @method saveImage
     * @param 
     * @description saves the image
    */
    saveImage(event) {
        let canvas = this.imageContext.canvas;
        let image = canvas.toDataURL("image/jpg");
        var data = image.replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');
        // fs.writeFile(__dirname + '/images/' + 'editedimage1.jpg', buf, function (err){});
    }

    /**
     * @method handleclick
     * @param event
     */
    handleClick(event) {
        if (event.target.closest('.image')) {
            var imageElement = event.target.closest('.image');
            
            console.log('a');
        }
    }

    /**
     * @method handleclick
     * @param event
     */
    handleMouseMove(event) {
        if (event.target.closest('.image')) {
            var imageElement = event.target.closest('.image');
            
            console.log('a');
        }
    }

    // DOM sanitizer to bypass the image URL
    sanitize(url:string){
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
}