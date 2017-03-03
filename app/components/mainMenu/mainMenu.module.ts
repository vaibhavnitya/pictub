import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { mainMenuComponent } from './mainMenu.component';


@NgModule({
  imports: [CommonModule],
  declarations: [mainMenuComponent],
  exports: [mainMenuComponent]
})
export class mainMenuModule { }