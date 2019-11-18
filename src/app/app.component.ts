import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AuthentificationService} from "./shared/services/authentification.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private readonly _authSevice: AuthentificationService, private readonly _route: Router){
  }

  login() {
    this._route.navigate(['/login']);
  }

  logout() {
    this._route.navigate(['/logout']);
  }

  isLogged(): boolean {
    return this._authSevice.userLogged;
  }
}
