import {Component, Input, OnInit} from '@angular/core';
import {Animal} from "../interfaces/animal";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  private _animal: Animal;

  constructor() { }

  @Input()
  set animal(animal: Animal) {
    this._animal = animal;
  }

  get animal() {
    return this._animal;
  }

  ngOnInit() {
  }
}
