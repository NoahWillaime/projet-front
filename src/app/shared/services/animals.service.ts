import { Injectable } from '@angular/core';
import {Animal} from "../interfaces/animal";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private readonly _backendURL: any;
  private readonly _defaultAnimal: Animal;

  constructor(private _http: HttpClient) {
    this._defaultAnimal = {
      name: 'animalname',
      photo: 'https://randomuser.me/api/portraits/men/37.jpg',
      species: 'species',
      breed: 'breed',
      gender: 'gender',
      diet: 'diet',
      health: 'health',
      description: 'description',
      enterDate: 1573982545,
    };
    this._backendURL = {};

    let backUrl =  `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;
    Object.keys(environment.backend.endpoints)
      .forEach(k => this._backendURL[k] = `${backUrl}${environment.backend.endpoints[k]}`);
  }

  fetch(): Observable<Animal[]> {
    return this._http.get<Animal[]>(this._backendURL.allAnimals)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  fetchOne(id: string): Observable<Animal> {
    return this._http.get<Animal>(this._backendURL.oneAnimal.replace(':id', id));
  }

  fetchSpecies(): Observable<string[]> {
    return this._http.get<string[]>(this._backendURL.allSpecies)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      )
  }

  fetchOneSpecies(species: string): Observable<Animal[]> {
    return this._http.get<Animal[]>(this._backendURL.oneSpecies.replace(':species', species))
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }
}
