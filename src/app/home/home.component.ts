import { Component, OnInit } from '@angular/core';
import {AnimalsService} from "../shared/services/animals.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private _current: string;
  constructor() {
    this._current = ""
  }

  get current(): string {
    return this._current;
  }

  ngOnInit() {
  }

  isCurrent(check: string){
    return this._current === check;
  }

  changeCurrent(change: string){
    this._current = change;
  }

}
