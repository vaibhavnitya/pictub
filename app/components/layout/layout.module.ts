import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { layoutComponent } from './layout.component';

import { loginModule } from '../login/login.module';
import { homePageModule } from '../homePage/homePage.module';

@NgModule({
  imports: [CommonModule, loginModule, homePageModule],
  declarations: [layoutComponent],
  exports: [layoutComponent]
})
export class layoutModule { }