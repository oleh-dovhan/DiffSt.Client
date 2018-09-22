import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { ResultFunction } from '../../models/result-function';
import { DiffData } from '../../models/diff-data';

declare let require: any;

@Component({
  selector: 'app-diff-card',
  templateUrl: './diff-card.component.html',
  styleUrls: ['./diff-card.component.scss']
})
export class DiffCardComponent implements OnInit {

  private math = require('mathjs');
  private parser = this.math.parser();

  private function: string;
  private leftLimit: number;
  private rightLimit: number;

  @Output()
  private solveButtonClicked: EventEmitter<DiffData>;

  private diffCardFormGroup: FormGroup;

  private functionControl: AbstractControl;
  private leftLimitControl: AbstractControl;
  private rightLimitControl: AbstractControl;

  constructor(private formBuilder: FormBuilder) {
    this.solveButtonClicked = new EventEmitter<DiffData>();
  }

  ngOnInit() {
    this.diffCardFormGroup = this.getDiffCardFormGroup();

    this.functionControl = this.diffCardFormGroup.controls.function;
    this.leftLimitControl = this.diffCardFormGroup.controls.leftLimit;
    this.rightLimitControl = this.diffCardFormGroup.controls.rightLimit;
  }

  private getDiffCardFormGroup(): FormGroup {
    return this.formBuilder.group({
      function: new FormControl('', [
        Validators.required,
        Validators.pattern('(?:[0-9-+*/^()t]|abs|e\^t|ln|log|a?(?:sin|cos|tan)h?)+')
      ]),
      leftLimit: new FormControl('', [
        Validators.required
      ]),
      rightLimit: new FormControl('', [
        Validators.required
      ])
    });
  }

  solve() {
    if (this.diffCardFormGroup.valid) {
      this.parser.eval('u(t) = ' + this.function);
      let diffData = new DiffData();
      diffData.function = this.parser.get('u');
      diffData.leftLimit = this.leftLimit;
      diffData.rightLimit = this.rightLimit;
      this.solveButtonClicked.emit(diffData);
    }
  }

}
