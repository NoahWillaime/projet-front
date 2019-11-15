import { Component, OnInit } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {Animals} from "../shared/interfaces/animals";

@Component({
  selector: 'app-animals-grid',
  templateUrl: './animals-grid.component.html',
  styleUrls: ['./animals-grid.component.css']
})
export class AnimalsGridComponent implements OnInit {
  animals: Animals[];

  constructor(private readonly _http: HttpClient) {
  }

  ngOnInit() {
    this._http.get('http://localhost:3000/animals')
      .subscribe((animals: Animals[]) =>
          this.animals = animals
      );
  }
}
