import {Component, Input, OnInit} from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {Animal} from "../shared/interfaces/animal";

@Component({
  selector: 'app-animals-grid',
  templateUrl: './animals-grid.component.html',
  styleUrls: ['./animals-grid.component.css']
})
export class AnimalsGridComponent implements OnInit {
  private _animals: Animal[];

  constructor(private readonly _http: HttpClient) {
    this._animals = [];
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
}
