import { Component, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'st-login',
  templateUrl: 'app/components/login/login.component.html',
  styleUrls: ['app/components/login/login.component.css']
})
export class loginComponent {

    constructor(public AuthenticationService: AuthenticationService) {}

    // generic Instantiate event EventEmitter
    @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();


    loginSubmit() {
        console.log('login submit clicked');
        this.AuthenticationService.login();
        this.isLoggedIn.emit(true);
        return false;
    }
 }