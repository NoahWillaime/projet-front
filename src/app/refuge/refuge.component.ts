import {Component, Input, OnInit} from '@angular/core';
import {RefugeService} from '../shared/services/refuge.service';
import {Address, Refuge} from '../shared/interfaces/refuge';
import {Animal} from '../shared/interfaces/animal';
import {defaultIfEmpty, filter, flatMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {merge, Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogComponent} from '../shared/dialog/dialog.component';
import {AnimalsService} from '../shared/services/animals.service';
import {DialogRefugeComponent} from '../shared/dialog/dialog-refuge/dialog-refuge.component';
import {AuthentificationService} from "../shared/services/authentification.service";
import {Benevole} from '../shared/interfaces/benevole';

@Component({
  selector: 'app-refuge',
  templateUrl: './refuge.component.html',
  styleUrls: ['./refuge.component.css']
})
export class RefugeComponent implements OnInit {
  private _isRefuge: boolean;
  private  _benevole: Benevole;
  private _refuge: Refuge;
  private _animals: Animal[];
  private _dialogStatus: string;
  private _dialogRefugeStatus: string;
  private _animalsDialog: MatDialogRef<DialogComponent>;
  private _refugeDialog: MatDialogRef<DialogRefugeComponent>;
  private _isOwned: boolean;

  constructor(private readonly _refugeService: RefugeService,
              private readonly _animalsService: AnimalsService,
              private readonly _route: ActivatedRoute,
              private _dialog: MatDialog,
              private readonly _authService: AuthentificationService,
              private readonly _router: Router) {
    this._refuge = {} as Refuge;
    this._refuge.address = {} as Address;
    this._animals = [];
    this._dialogStatus = 'inactive';
    this._dialogRefugeStatus = 'inactive';
    this._isRefuge = false;
    this._isOwned = false;
  }

  get isOwned() {
    return this._isOwned;
  }

  @Input()
  set isOwned(value) {
    this._isOwned = value;
  }

  get animals(): Animal[] {
    return this._animals;
  }

  get refuge(): Refuge {
    return this._refuge;
  }

  @Input()
  set refuge(value: Refuge) {
    this._refuge = value;
  }

  get isRefuge(): boolean {
    return this._isRefuge;
  }

  ngOnInit() {
    this._benevole = JSON.parse(localStorage.getItem('currentUser'));
    this._route.queryParams
      .pipe(
        filter(_ => !!_.id),
        flatMap(_ => this._refugeService.fetchOne(_.id))
      )
      .subscribe((refuge: Refuge) => { this._refuge = refuge; this._fetchAnimals() });
    if (this._refuge.id) {
      this._fetchAnimals();
    }
  }

  isLogIn(): boolean {
    return this._authService.userLogged;
  }

  private _fetchAnimals() {
    this._refugeService.fetchAnimals(this._refuge.id)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      )
      .subscribe((animals: Animal[]) => this._animals = [].concat(animals));
    this._isRefuge = true;
  }

  private _add(animal: Animal): Observable<Animal[]> {
    return this._animalsService
      .create(animal)
      .pipe(
        flatMap(_ => this._refugeService.fetchAnimals(this.refuge.id))
      );
  }

  private _addRefuge(refuge: Refuge): Observable<Refuge> {
    return this._refugeService
      .create(refuge)
      .pipe(
        flatMap(_ => this._refugeService.fectchOneByUser(this._benevole.id))
      );
  }

  showDialog() {
    this._dialogStatus = 'active';
    this._animalsDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
    });
    this._animalsDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        tap((animal: Animal) => animal.refugeId = this.refuge.id),
        flatMap(_ => this._add(_))
      )
      .subscribe(
        (animals: Animal[]) => this._animals = [].concat(animals),
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  showRefugeDialog() {
    this._dialogRefugeStatus = 'active';
    this._refugeDialog = this._dialog.open(DialogRefugeComponent, {
      width: '500px',
      disableClose: true,
    });
    this._refugeDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        flatMap(_ => this._addRefuge(_))
      )
      .subscribe(
        () => undefined,
        _ => this._dialogRefugeStatus = 'inactive',
        () => { this._dialogRefugeStatus = 'inactive'; window.location.reload(); }
      );
  }


  delete(animal: Animal) {
  this._animalsService.delete(animal.id)
    .pipe(
      flatMap(_ => this._refugeService.fetchAnimals(this._refuge.id))
    )
    .subscribe(
      (animals: Animal[]) => this._animals = [].concat(animals),
    );
  }

  deleteRefuge(refuge: Refuge) {
    this._refugeService.delete(refuge.id)
      .pipe(
        flatMap(_ => this._refugeService.fectchOneByUser(this.refuge.id))
      )
      .subscribe(
        (refuge: Refuge) => this._refuge = refuge,
      );
  }

}
