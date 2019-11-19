import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BenevolesService} from "../shared/services/benevoles.service";
import {Benevole} from "../shared/interfaces/benevole";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  private readonly _formUser: FormGroup;
  private readonly _formPass: FormGroup;
  private readonly _formFirstname: FormGroup;
  private readonly _formLastname: FormGroup;

  constructor(private readonly _userService: BenevolesService, private readonly _route: Router, private _snackBar: MatSnackBar) {
    this._formUser = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ]))
    });
    this._formPass = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ]))
    });
    this._formFirstname = new FormGroup({
      firstname: new FormControl('', Validators.required )
    });
    this._formLastname = new FormGroup({
      lastname: new FormControl('', Validators.required )
    });
  }


  get formUser(): FormGroup {
    return this._formUser;
  }

  get formPass(): FormGroup {
    return this._formPass;
  }

  get formFirstname(): FormGroup {
    return this._formFirstname;
  }

  get formLastname(): FormGroup {
    return this._formLastname;
  }

  ngOnInit() {
  }

  submit() {
    const user: Benevole = {
      'username': this.formUser.value.username,
      'password': this.formPass.value.password,
      'firstname': this.formFirstname.value.firstname,
      'lastname': this.formLastname.value.lastname
    };
    this._userService.create(user)
      .subscribe(
        () => undefined,
        error => this._openSnackError("Inscription impossible..", ""),
        () => this._route.navigate(['/login'])
      );
  }

  private _openSnackError(errormsg: string, action: string) {
    this._snackBar.open(errormsg, action, {
      duration: 2000,
    });
  }
}
