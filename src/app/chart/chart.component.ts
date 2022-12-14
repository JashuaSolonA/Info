import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const a = [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900];
    const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    console.log(a);
    let options = {
      chart: {
        type: 'bar',
        heigth: '200px',
      },
      title: { text: 'Grafico de Salarios' },
      series: [
        {
          name: 'Sueldo',
          data: a,
        },
      ],

      xaxis: {
        title: {
          text: 'ID',
          position: 'bottom',
        },
        categories: id,
      },

      yaxis: [
        {
          title: {
            text: 'SALARIO',
          },
        },
      ],
    };

    let chart = new ApexCharts(document.querySelector('#chart'), options);

    chart.render();
  }

  onRightClick(chart: HTMLElement, chartId: string, event?: Event) {
    console.log(event);
    console.log(chart);
    console.log(chartId);
  }
}
