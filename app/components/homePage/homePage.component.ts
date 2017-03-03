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

  // handle events from main menu
  mainMenuClick(option){
    if(option === 'addImage') {
      this.showAddImage = true;
    }
  };

}
