import { Component, OnInit, NgZone } from '@angular/core';
import { NgFor } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'underscore';

@Component({
    selector: 'st-list-image',
    templateUrl: 'app/components/listImage/listImage.component.html',
    styleUrls: ['app/components/listImage/listImage.component.css']
})

export class listImageComponent {

    // constructor declarations
    constructor(private sanitizer:DomSanitizer, private ngZone: NgZone){}

    allFiles: Array <Object> = [];
    totalFiles: number = 0;
    totalSize: number = 0;
    showImagesList: boolean = true;
    showImageEdit: boolean = false;

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
        this.totalFiles = 0;
        this.totalSize = 0;

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
                                self.totalFiles ++;
                                self.totalSize += stats.size;
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

    /**
     * @method sortList
     * @param type of sort
     * @description The parameter takes following values- 
     * decreasingDate, increasingDate, decreasingFileSize, increasingFileSize
     * and sorts accordingly
    */
    sortList(type) {
        switch(type) {
            case 'decreasingDate': {
                this.allFiles = _.sortBy(this.allFiles, function(file:any) {
                    return file.ctime.getTime(); 
                }).reverse();
            }
            break;
            case 'increasingDate': {
                this.allFiles = _.sortBy(this.allFiles, function(file:any) {
                    return file.ctime.getTime(); 
                });
            }
            break;
            case 'decreasingFileSize': {
                this.allFiles = _.sortBy(this.allFiles, function(file: any) {
                    return file.size; 
                }).reverse();
            }
            break;
            case 'increasingFileSize': {
                this.allFiles = _.sortBy(this.allFiles, function(file: any) {
                    return file.size; 
                });
            }
            break;
            default: {

            }
            break;

        }
    }

    /**
     * @method deleteImage
     * @param file-object
     * @description The parameter passed is the file object which contains
     * the path of the file that has to be deleted
    */
    deleteImage(file) {
        var self = this;
        fs.unlink(file.path, (err) => {
            if (!err) {
                 self.ngZone.run(() => {
                    self.allFiles.splice(file, 1);
                });
            }
        });
    }

    /**
     * @method editImage
     * @param file-object
     * @description The parameter passed is the file object which contains
     * the path of the file that has to be edited
    */
    editImage(file) {
        this.showImagesList = false;
        this.showImageEdit = true;
    }


    // DOM sanitizer to bypass the image URL
    sanitize(url:string){
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

}