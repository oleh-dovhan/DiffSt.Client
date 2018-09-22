import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { DiffCardComponent } from './components/diff-card/diff-card.component';
import { ResultTableComponent } from './components/result-table/result-table.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import 'chartjs-plugin-zoom';

import { MaterialModule } from './material.module';


import { DiffService } from './services/diff.service';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DiffCardComponent,
    ResultTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MaterialModule
  ],
  providers: [DiffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
