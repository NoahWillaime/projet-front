import {Component, Input, OnInit} from '@angular/core';
import {AnimalsService} from "../shared/services/animals.service";
import {ActivatedRoute} from "@angular/router";
import {Animal} from "../shared/interfaces/animal";
import {from, merge} from "rxjs";
import {filter, flatMap, map, tap} from "rxjs/operators";

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {
  private _species: string[];
  private _animals: Animal[];
  private _isOnlyOne: boolean;

  constructor(private _animalsService: AnimalsService, private _route: ActivatedRoute) {
    this._species = [];
    this._animals = [];
    this._isOnlyOne = true;
  }

  get animals(): Animal[] {
    return this._animals;
  }

  @Input()
  set species(species: string[]) {
    this._species = [].concat(species);
  }

  get species(): string[] {
    return this._species;
  }

  get isOnlyOne(): boolean {
    return this._isOnlyOne;
  }

  ngOnInit() {
    merge(
      this._route.params.pipe(
        filter(params => !!params.species),
        tap(_ => this._species = this._species.concat(_.species)),
        flatMap(params => this._animalsService.fetchOneSpecies(params.species))
      ),
      this._route.params.pipe(
        filter(params => !params.species),
        map(_ => this._animalsService.fetchSpecies()),
        tap(_ => _.forEach(_ => this._species = this._species.concat(_))),
        tap(_ => this._isOnlyOne = false),
        flatMap(_ => this._animalsService.fetch()),
      )
    )
      .subscribe((animals: Animal[]) => this._animals = this._animals.concat(animals));
  }

  animalsBySpecies(species: string): Animal[] {
    return this._animals.filter(_ => _.species.toLowerCase() === species.toLowerCase());
  }

}
