import { Component, EventEmitter } from '@angular/core';
import { DiffData } from './models/diff-data';
import { Point2d } from './models/point2d';
import { ChartData } from './models/chart-data';
import { ResultElement } from './models/result-element';
import { DiffService } from './services/diff.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private readonly countPoints: number;

  private newChartDataFound: EventEmitter<ChartData>;
  private resultTableData: ResultElement[];

  constructor(private diffService: DiffService) {
    this.countPoints = 40;
    this.newChartDataFound = new EventEmitter<ChartData>();
  }

  private setChartData(realPoints: Point2d[], methodPoints: Point2d[]) {
    let data = new ChartData();
    data.labels = ['Задане', 'За допомогою методу'];
    data.chartLabels = realPoints.map(p => p.x.toString());
    data.datapoints = [realPoints.map(p => p.y), methodPoints.map(p => p.y)];
    return data;
  }

  private setTableData(realPoints: Point2d[], methodPoints: Point2d[]) {
    let table: ResultElement[] = [];
    for (let i = 0; i < realPoints.length; ++i) {
      let resultElement = new ResultElement();
      resultElement.position = i + 1;
      resultElement.value = realPoints[i].x;
      resultElement.realValue = realPoints[i].y;
      resultElement.methodValue = methodPoints[i].y;
      resultElement.difference = resultElement.realValue - resultElement.methodValue;
      table.push(resultElement);
    }
    this.resultTableData = table;
  }

  solveButtonClickedHandler(diffData: DiffData) {
    setTimeout(() => {
      let realPoints = this.diffService.discretize(diffData, this.countPoints);
      let methodPoints = this.diffService.getMethodPoints(realPoints);
      this.newChartDataFound.emit(this.setChartData(realPoints, methodPoints));
      this.setTableData(realPoints, methodPoints);
    }, 2000);
  }

}

