import { Component, OnInit } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {Animal} from "../shared/interfaces/animal";

@Component({
  selector: 'app-animals-grid',
  templateUrl: './animals-grid.component.html',
  styleUrls: ['./animals-grid.component.css']
})
export class AnimalsGridComponent implements OnInit {
  animals: Animal[];

  constructor(private readonly _http: HttpClient) {
  }

  ngOnInit() {
    this._http.get('http://localhost:3000/animals')
      .subscribe((animals: Animal[]) =>
          this.animals = animals
      );
  }
}
