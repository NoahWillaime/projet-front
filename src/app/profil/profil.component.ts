import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RefugeService} from "../shared/services/refuge.service";
import {filter, flatMap} from "rxjs/operators";
import {Refuge} from "../shared/interfaces/refuge";
import {BenevolesService} from "../shared/services/benevoles.service";
import {Benevole} from "../shared/interfaces/benevole";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  private _benev: Benevole;
  private _refuge: Refuge;
  private _hadError: boolean;

  constructor(private _route: ActivatedRoute, private _refugesService: RefugeService, private _userService: BenevolesService) {
    this._hadError = false;
  }

  get refuge(): Refuge {
    return this._refuge;
  }

  get hadError(): boolean {
    return this._hadError;
  }

  get benev(): Benevole {
    return this._benev;
  }

  ngOnInit() {
    this._benev= JSON.parse(localStorage.getItem('currentUser'));
    this._userService.fetchOne(this._benev.id)
      .subscribe(
        (user: Benevole) =>
          this._refugesService.fectchOneByUser(user.id)
          .subscribe(
            (refuge: Refuge) => this._refuge = refuge,
            (error: Error) => this._refuge = {} as Refuge,
          ),
        () => this._hadError = true
        );
  }
}
