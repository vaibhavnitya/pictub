import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homePageComponent } from './homePage.component';

import { mainMenuModule } from '../mainMenu/mainMenu.module';
import { addImageModule } from '../addImage/addImage.module';

@NgModule({
  imports: [CommonModule, mainMenuModule, addImageModule],
  declarations: [homePageComponent],
  exports: [homePageComponent]
})
export class homePageModule { }