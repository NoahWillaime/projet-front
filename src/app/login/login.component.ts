import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../shared/services/authentification.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private readonly _form: FormGroup;
  private _error: any = '';

  constructor(private _authentificationService: AuthentificationService, private readonly _router: Router) {
    this._form = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  get form(): FormGroup {
    return this._form;
  }

  get error(): any {
    return this._error;
  }

  ngOnInit() {
  }

  logout(){
    this._authentificationService.logout();
  }

  onSubmit(user: any){
    this._authentificationService.login(user.username, user.password)
      .subscribe(
        data => {
            this._router.navigate(['/']);
        },
        error => {
          this._error = error;
        }
      );
  }

}
