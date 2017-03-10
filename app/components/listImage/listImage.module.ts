import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { listImageComponent } from './listImage.component';

@NgModule({
    imports: [CommonModule],
    declarations: [listImageComponent],
    exports: [listImageComponent]
})

export class listImageModule {}