import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../shared/services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private readonly _authService: AuthentificationService, private readonly _router: Router) { }

  ngOnInit() {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
