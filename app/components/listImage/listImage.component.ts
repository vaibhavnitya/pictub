import { Component, OnInit, NgZone } from '@angular/core';
import { NgFor } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'st-list-image',
    templateUrl: 'app/components/listImage/listImage.component.html',
    styleUrls: ['app/components/listImage/listImage.component.css']
})

export class listImageComponent {

    // constructor declarations
    constructor(private sanitizer:DomSanitizer, private ngZone: NgZone){}

    allFiles: Array <Object> = [];

    ngOnInit(){
        this.getAllFiles('/images/');
    }

    /**
     * @method getAllFiles
     * @param directoryname
     * @description Gets the array of files present in the directory
     * fs.readdir gets all te file names in a arry present in the directory. It is then
     * iterrated over to get all the file information by file stat. The file objects are pushed
     * to allFiles Object 
    */
    getAllFiles(dir) {
        var self = this;
        let imageDir: string = __dirname;
        let files: any;
        this.allFiles.length = 0;

        imageDir = imageDir.replace(/\\/g,'/') + dir;

        fs.readdir(imageDir, function (err, files) {
            if (!err && files) {
                files.forEach(function (file) {
                    fs.stat((imageDir + file), function (err, stats) {
                        if (!err  && stats) {
                            stats.path = imageDir + file;
                            stats.name = file;
                            // to update stache accordingly
                            self.ngZone.run(() => { 
                                self.allFiles.push(stats);
                            });
                        } else {
                            console.log('error in getting file stat for' + file);
                        }
                    });
                });
            } else {
                console.log('error in finding files in directory');
            }
        });
    }


    // DOM sanitizer to bypass the image URL
    sanitize(url:string){
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

}