import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { listImageComponent } from './listImage.component';

import { editImageModule } from '../editImage/editImage.module';


@Pipe({ name: 'byteFormat'})
class ByteFormatPipe implements PipeTransform {
  transform(bytes, args) {
    if(bytes == 0) return '0 Bytes';
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
  }
}

@NgModule({
    imports: [CommonModule, editImageModule],
    declarations: [listImageComponent, ByteFormatPipe],
    exports: [listImageComponent]
})

export class listImageModule {}