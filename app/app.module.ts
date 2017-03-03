import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import {AppComponent}  from './app.component';

import { layoutModule } from './components/layout/layout.module';

@NgModule({
    imports:        [BrowserModule, HttpModule, layoutModule],
    declarations:   [AppComponent],
    bootstrap:      [AppComponent]
})

export class AppModule {}