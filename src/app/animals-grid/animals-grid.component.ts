import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {Animal} from "../shared/interfaces/animal";

@Component({
  selector: 'app-animals-grid',
  templateUrl: './animals-grid.component.html',
  styleUrls: ['./animals-grid.component.css']
})
export class AnimalsGridComponent implements OnInit {
  private _animals: Animal[];
  private _delete$: EventEmitter<Animal>;

  constructor(private readonly _http: HttpClient) {
    this._animals = [];
    this._delete$ = new EventEmitter<Animal>();
  }

  @Output('deleteAnimal')
  get delete$(): EventEmitter<Animal> {
    return this._delete$;
  }

  @Input()
  set animals(animals: Animal[]) {
    this._animals = [].concat(animals);
  }

  get animals(): Animal[] {
    return this._animals;
  }

  ngOnInit() {
    this._animals = [];
  }

  delete(animal: Animal) {
    this._delete$.emit(animal);
  }
}
