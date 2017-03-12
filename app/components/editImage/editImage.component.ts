import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'st-edit-image',
    templateUrl: 'app/components/editImage/editImage.component.html',
    styleUrls: ['app/components/editImage/editImage.component.css']
})

export class editImageComponent {

    editImageInitiate(file) {
        console.log(file);
    }
}