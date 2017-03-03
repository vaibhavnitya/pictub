//import {bootstrap} from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'st-add-image',
    templateUrl: 'app/components/addImage/addImage.component.html',
    styleUrls: ['app/components/addImage/addImage.component.css']
})

export class addImageComponent {
 
    images:Array <Object> = [];

    constructor(private sanitizer:DomSanitizer){}
    
    sanitize(url:string){
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    handleDrop(e) {
        var files:File = e.dataTransfer.files;
        var self = this;
        Object.keys(files).forEach((key) => {
        if(files[key].type === "image/png" || files[key].type === "image/jpeg") {
            self.images.push(files[key]);
        }
        else {
            alert("File must be a PNG or JPEG!");
        }
        });

        return false;
    }

    imageStats() {

        let sizes:Array<number> = [];
        let totalSize:number = 0;

        this
        .images
        .forEach((image:File) => sizes.push(image.size));

        sizes
        .forEach((size:number) => totalSize += size);

        return {
        size: totalSize,
        count: this.images.length
        }

    }

    logger(data) {
        console.log(data);

    }

}