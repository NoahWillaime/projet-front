import {Injectable} from "@angular/core";
import {Animal} from "../interfaces/animal";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter} from "rxjs/operators";
import {Refuge} from '../interfaces/refuge';

@Injectable({
  providedIn: 'root'
})
export class RefugeService {
  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    let backUrl =  `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;
    Object.keys(environment.backend.endpoints)
      .forEach(k => this._backendURL[k] = `${backUrl}${environment.backend.endpoints[k]}`);
  }

  fetch(): Observable<Refuge[]> {
    return this._http.get<Refuge[]>(this._backendURL.allRefuges)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  fetchOne(id: string): Observable<Refuge> {
    return this._http.get<Refuge>(this._backendURL.oneRefuge.replace(':id', id));
  }

  fectchOneByUser(id: string): Observable<Refuge> {
    return this._http.get<Refuge>(this._backendURL.refugeByUser.replace(':id', id));
  }

  fetchAnimals(id: string): Observable<Animal[]> {
    return this._http.get<Animal[]>(this._backendURL.someAnimals.replace(':id', id))
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      )
  }
}
