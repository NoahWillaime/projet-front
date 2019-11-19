import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Animal} from '../interfaces/animal';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [ './form.component.css' ]
})
export class FormComponent implements OnInit, OnChanges {
  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Animal;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Animal>;
  // private property to store form value
  private readonly _form: FormGroup;

  /**
   * Component constructor
   */
  constructor() {
    this._submit$ = new EventEmitter<Animal>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Animal) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): Animal {
    return this._model;
  }

  /**
   * Returns private property _form
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Returns private property _isUpdateMode
   */
  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  /**
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Animal> {
    return this._submit$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to handle component update
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
      this._model.enterDate = new Date(this._model.enterDate);
      this._form.patchValue(this._model);
    } else {
      this._model = {
        name: '',
        photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
        species: '',
        breed: '',
        gender: '',
        diet: '',
        health: '',
        description: '',
        refugeId: '',
        enterDate: 121212
      };
      this._isUpdateMode = false;
    }
  }

  /**
   * Function to emit event to cancel process
   */
  cancel() {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and person
   */
  submit(data: Animal) {
 //   data.id = this._model.id;
    data.refugeId = this._model.refugeId;
    data.enterDate = data.enterDate.getTime();
    this._submit$.emit(data);
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg'),
      species: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      breed: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      gender: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      diet: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      health: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      description: new FormControl(''),
      enterDate: new FormControl(new Date(), Validators.compose([
        Validators.required
      ]))
    });
  }
}
