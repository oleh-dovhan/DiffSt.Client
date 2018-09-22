import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ChartData } from '../../models/chart-data';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

	private readonly chartType: string = 'line';
	private readonly options: Object = {
		responsive: true,
		title: {
			display: true,
			text: 'Solution'
		},
		tooltips: {
			mode: 'index'
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Value'
				},
				ticks: {
					suggestedMin: -1,
					suggestedMax: 1,
				}
			}]
		},
		pan: {
			enabled: true,
			mode: 'xy',
		},
		zoom: {
			enabled: true,
			mode: 'xy',
		}
	}

	private chartLabels: Array<string> = [];
	private datasets: Array<Object> = [];

	@Input()
	private newChartDataFound: EventEmitter<ChartData>;

	// private readonly datasets: Array<Object> = [{
	// 	label: 'Cubic interpolation (monotone)',
	// 	data: this.datapoints,
	// 	borderColor: "#FF0000",
	// 	backgroundColor: 'rgba(0, 0, 0, 0)',
	// 	fill: false,
	// 	cubicInterpolationMode: 'monotone',
	// }, {
	// 	label: 'Cubic interpolation (default)',
	// 	data: this.datapoints,
	// 	borderColor: "0000ff",
	// 	backgroundColor: 'rgba(0, 0, 0, 0)',
	// 	fill: false,
	// }, {
	// 	label: 'Linear interpolation',
	// 	data: this.datapoints,
	// 	borderColor: "#008000",
	// 	backgroundColor: 'rgba(0, 0, 0, 0)',
	// 	fill: false,
	// 	lineTension: 0
	// }];

	ngOnInit() {
		if (this.newChartDataFound != undefined && this.newChartDataFound != null) {
			this.newChartDataFound.subscribe((chartData: ChartData) => {
				this.setChartData(chartData);
			});
		}
	}

	private createDataset(label: string, datapoints: Array<number>): Object {
		return {
			label: label,
			data: datapoints,
			borderColor: "",
			backgroundColor: 'rgba(0, 0, 0, 0)',
			fill: false,
		};
	}

	private setChartData(chartData: ChartData) {
		if (chartData.labels.length == chartData.datapoints.length) {
			this.chartLabels = chartData.chartLabels;
			this.datasets = [];
			for (let i = 0; i < chartData.labels.length; ++i) {
				this.datasets.push(this.createDataset(chartData.labels[i], chartData.datapoints[i]));
			}
		}
	}

}
