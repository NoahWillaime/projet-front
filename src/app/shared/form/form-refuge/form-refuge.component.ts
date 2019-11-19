import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Refuge} from '../../interfaces/refuge';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-refuge',
  templateUrl: './form-refuge.component.html',
  styleUrls: ['./form-refuge.component.css']
})

export class FormRefugeComponent implements OnInit, OnChanges {
  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Refuge;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Refuge>;
  // private property to store form value
  private readonly _form: FormGroup;

  /**
   * Component constructor
   */
  constructor() {
    this._submit$ = new EventEmitter<Refuge>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Refuge) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): Refuge {
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
  get submit$(): EventEmitter<Refuge> {
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
    console.log(record.model);
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
      this._model.userId = '1';
      this._form.patchValue(this._model);
    } else {
      this._model = {
        name: '',
        address: {
          postalCode: '',
          street: '',
          city: ''
        },
        phone: '',
        email: '',
        userId: ''
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
  submit(data: Refuge) {
    //data.userId = '';
    this._submit$.emit(data);
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        postalCode: new FormControl('')
      }),
      //animalsIds
      phone: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('\\d{11}')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      userId: new FormControl('0'),
    });
  }
}

