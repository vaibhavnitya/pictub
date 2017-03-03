import { Component, OnInit } from '@angular/core';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'st-layout',
  templateUrl: 'app/components/layout/layout.component.html',
  styleUrls: ['app/components/layout/layout.component.css']
})
export class layoutComponent {

  isLoggedIn: boolean = false;

  ngOnInit() {
    this.checkLoginStatus();
  }

  /**
   * check login status of the user
   */
  checkLoginStatus() {
    this.isLoggedIn = false;
  }

}
