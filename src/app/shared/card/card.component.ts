import {Component, Input, OnInit} from '@angular/core';
import {Animal} from "../interfaces/animal";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  private _animal: Animal;
  private _isMale: boolean;

  constructor() { }

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
}
