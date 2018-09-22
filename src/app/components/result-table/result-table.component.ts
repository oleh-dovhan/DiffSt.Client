import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ResultElement } from '../../models/result-element';


@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent {

  private displayedColumns = ['position', 'value', 'real', 'method', 'difference'];
  @Input()
  private dataSource: ResultElement[];

}
