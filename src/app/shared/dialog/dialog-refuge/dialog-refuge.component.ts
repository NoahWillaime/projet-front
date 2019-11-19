import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Refuge} from '../../interfaces/refuge';

@Component({
  selector: 'app-dialog-refuge',
  templateUrl: './dialog-refuge.component.html',
  styleUrls: ['./dialog-refuge.component.css']
})

export class DialogRefugeComponent implements OnInit {

  /**
   * Component constructor
   */
  constructor(private _dialogRef: MatDialogRef<DialogRefugeComponent>, @Inject(MAT_DIALOG_DATA) private _refuge: Refuge) {
  }

  /**
   * Returns refuge passed in dialog open
   */
  get refuge(): Refuge {
    return this._refuge;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel() {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send refuge to parent
   */
  onSave(refuge: Refuge) {
    this._dialogRef.close(refuge);
  }
}

