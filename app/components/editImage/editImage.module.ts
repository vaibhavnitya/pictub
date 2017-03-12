import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { editImageComponent } from './editImage.component';

@NgModule({
    imports: [CommonModule],
    declarations: [editImageComponent],
    exports: [editImageComponent]
})

export class editImageModule {}