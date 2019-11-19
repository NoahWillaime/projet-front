import { Component, OnInit } from '@angular/core';
import {Animal} from "../shared/interfaces/animal";
import {AnimalsService} from "../shared/services/animals.service";

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  private _animals: Animal[];

  constructor(private readonly _animalsService: AnimalsService) {
    this._animals = [];
  }

  get animals(): Animal[] {
    return this._animals;
  }

  ngOnInit() {
    this._animalsService.fetch()
      .subscribe(
        (animals: Animal[]) => this._animals = animals,
      )
  }

  haveAnimals(): boolean {
    return this._animals.length != 0;
  }

}
