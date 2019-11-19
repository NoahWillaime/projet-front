import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Benevole} from "../interfaces/benevole";

@Injectable({
  providedIn: 'root'
})
export class BenevolesService {
  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    let backUrl =  `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;
    Object.keys(environment.backend.endpoints)
      .forEach(k => this._backendURL[k] = `${backUrl}${environment.backend.endpoints[k]}`);
  }

  fetchOne(id: string): Observable<Benevole> {
    return this._http.get<Benevole>(this._backendURL.oneUser.replace(':id', id));
  }


  create(user: Benevole): Observable<any> {
    console.log(user);
    return this._http.post<Benevole>(this._backendURL.allUser, user, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}
