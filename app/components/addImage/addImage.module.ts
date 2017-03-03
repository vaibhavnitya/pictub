import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addImageComponent } from './addImage.component';

@Pipe({ name: 'byteFormat'})
class ByteFormatPipe implements PipeTransform {
  // Credit: http://stackoverflow.com/a/18650828
  transform(bytes, args) {
    if(bytes == 0) return '0 Bytes';
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
  }
}

@NgModule({
    imports: [CommonModule],
    declarations: [addImageComponent, ByteFormatPipe],
    exports: [addImageComponent]
})

export class addImageModule {}
