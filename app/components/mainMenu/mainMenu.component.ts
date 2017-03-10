import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'st-app-menu',
    templateUrl: 'app/components/mainMenu/mainMenu.component.html',
    styleUrls: ['app/components/mainMenu/mainMenu.component.css'],
    host: {
        '(document:click)': 'clickedOut($event)',
    }
})
export class mainMenuComponent {

  // export the click evets to the parent
  @Output() menuClick: EventEmitter<string> = new EventEmitter<string>();
  
  // variable to show the profile options
  showProfileOptions: boolean = false;

  // function on click add Image
  addImageClick() {
    this.menuClick.emit('addImage');
  };

  // function on click list Image
  listImageClick() {
    this.menuClick.emit('listImage');
  };

  // function to toggle profile button click
  toggleProfileMenu () {
    this.showProfileOptions = !this.showProfileOptions;
  };

  // function to handle clicks outside the element
  clickedOut (event) {
    if (document.getElementById('profile-menu') && !event.target.closest('#profile')) {
      event.target.closest('#profile-menu') ? null : this.showProfileOptions = false;
    }
  }

}
