import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Benevole} from "../interfaces/benevole";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private readonly _backendURL: any;
  private currentUserSubject: BehaviorSubject<Benevole>;
  public currentUser: Observable<Benevole>;

  constructor(private _http: HttpClient) {
    let backUrl =  `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;
    this._backendURL = {};
    Object.keys(environment.backend.endpoints)
      .forEach(k => this._backendURL[k] = `${backUrl}${environment.backend.endpoints[k]}`);
    localStorage.removeItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<Benevole>({} as Benevole);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Benevole {
    return this.currentUserSubject.value;
  }

  public get userLogged(): boolean {
    if (!this.currentUserSubject.value)
      return false;
    return true;
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post<any>(this._backendURL.login, { username, password })
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
