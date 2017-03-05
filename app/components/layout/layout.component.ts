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

  showLoginWindow: boolean = true;

  ngOnInit() {
    //this.checkLoginStatus(false);
  }

  /**
   * check login status of the user
   */
  checkLoginStatus(status) {
    if (status) {
      this.showLoginWindow = false;
    }
  }

}
