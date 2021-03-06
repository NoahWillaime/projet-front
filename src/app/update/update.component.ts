import { Component, OnInit } from '@angular/core';
import {DialogComponent} from "../shared/dialog/dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalsService} from "../shared/services/animals.service";
import {filter, flatMap, map, tap} from "rxjs/operators";
import {Animal} from "../shared/interfaces/animal";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private _animalDialog: MatDialogRef<DialogComponent>;
  private _animalId: string;
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _animalsService: AnimalsService,
              private _dialog: MatDialog) {}

  ngOnInit() {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        tap(_ => this._animalId = _),
        flatMap((id: string) => this._animalsService.fetchOne(id))
      )
      .subscribe((animal: Animal) => {
        this._animalDialog = this._dialog.open(DialogComponent, {
          width: '500px',
          disableClose: true,
          data: animal,
        });

        this._animalDialog.afterClosed()
          .pipe(
            filter(_ => !!_),
            flatMap(_ => this._animalsService.update(this._animalId, _))
          )
          .subscribe(
            () => undefined,
            () => undefined,
            () => this._router.navigate(['/profil'])
          );
      });
  }

}
