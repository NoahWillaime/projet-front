import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Animal} from "../interfaces/animal";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  private _animal: Animal;
  private _isMale: boolean;
  private readonly _delete$: EventEmitter<Animal>;
  private _isOwned: boolean;

  constructor(private readonly _authService: AuthentificationService, private readonly _route: Router) {
    this._delete$ = new EventEmitter<Animal>();
    this._isOwned = false;
  }


  get isOwned(): boolean {
    return this._isOwned;
  }

  @Input()
  set isOwned(value: boolean) {
    this._isOwned = value;
  }

  @Output('deleteAnimal')
  get delete$(): EventEmitter<Animal> {
    return this._delete$;
  }

  @Input()
  set animal(animal: Animal) {
    this._animal = animal;
  }

  get animal() {
    return this._animal;
  }

  get isMale(): boolean {
    return this._isMale;
  }

  ngOnInit() {
    this._isMale = false;
    if (this._animal.gender === "Male") {
      this._isMale = true;
    }
  }

  goToRefuge() {
    this._route.navigate(['/refuge'], { queryParams: { id: this._animal.refugeId }});
  }

  isLogIn(): boolean {
    return this._authService.userLogged;
  }

  delete(animal: Animal) {
    this._delete$.emit(animal);
  }
}
