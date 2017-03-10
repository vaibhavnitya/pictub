import { Component, NgZone } from '@angular/core';
import { NgFor } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'st-add-image',
    templateUrl: 'app/components/addImage/addImage.component.html',
    styleUrls: ['app/components/addImage/addImage.component.css']
})

export class addImageComponent {

    // constructor declarations    
    constructor(private sanitizer:DomSanitizer, private ngZone: NgZone){}
 
    images:Array <Object> = [];
    
    isImageSelected: boolean = false;   // to check if any image is been selected
    addedImage: string = null;          // path of preview image
    addedImageName: string = null;      // image name
    addedImageObject: Object = null;      // image added object
    
    // to check if the changes in add files
    addFile(e) {
        if (e.target.files && e.target.files.length) {
            let file = e.target.files[0];
            this.addedImageObject = e.target.files[0];
            if (file.path) {
                this.addedImage = file.path;
                if (file.name) {
                    this.addedImageName = file.name;
                }
                this.isImageSelected = true;
            }
        }
    }

    // function to save the images
    saveImage() {
        let file: any = this.addedImageObject;
        let imageDir: string = __dirname;
        let destPath: string;
        var self: any = this;
        imageDir = imageDir.replace(/\\/g,'/') + '/images/';
        if (file && file.path) {
            destPath = imageDir + this.addedImageName;
            fs.stat(destPath, function(err, stat) {
                if(err == null) {
                    console.log('File exists');
                } else if(err.code == 'ENOENT') {
                    // file does not exist hence can create new
                    fs.createReadStream(file.path).pipe(fs.createWriteStream(destPath));
                    // to update stache accordingly
                    self.ngZone.run(() => { 
                        self.isImageSelected = false; 
                    });
                } else {
                    console.log('Some other error: ', err.code);
                }
            });
        }
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

    // DOM sanitizer to bypass the image URL
    sanitize(url:string){
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

}