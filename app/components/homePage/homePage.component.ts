import { Component, OnInit } from '@angular/core';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'st-home',
  templateUrl: 'app/components/homePage/homePage.component.html',
  styleUrls: ['app/components/homePage/homePage.component.css']
})
export class homePageComponent {

  showAddImage: boolean = false;
  showListImage: boolean = false;

  // handle events from main menu
  mainMenuClick(option){
    this.showAddImage = false;
    this.showListImage = false;

    if(option === 'addImage') {
      this.showAddImage = true;
    } else if (option === 'listImage') {
      this.showListImage = true;
    }
    
  };

}
