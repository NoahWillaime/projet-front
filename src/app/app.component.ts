import { Component } from '@angular/core';
import {AuthentificationService} from "./shared/services/authentification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private readonly _authSevice: AuthentificationService){
  }

  isLog(): boolean {
    const currentUser =  this._authSevice.currentUserValue
    if (currentUser)
      return true;
    else
      return false;
  }
}
