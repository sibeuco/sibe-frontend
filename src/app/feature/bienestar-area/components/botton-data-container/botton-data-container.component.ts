import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);

@Component({
  selector: 'app-botton-data-container',
  templateUrl: './botton-data-container.component.html',
  styleUrls: ['./botton-data-container.component.scss']
})
export class BottonDataContainerComponent implements AfterViewInit{

  ngAfterViewInit(): void {
      const ctx = document.getElementById('myBarChart') as HTMLCanvasElement;

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Noviembre', 'Diciembre'
          ],
          datasets: [{
            label: 'Participantes',
            data: [10, 75, 150, 100, 120, 20, 15, 95, 62, 36, 21],
            backgroundColor: ['rgba(255, 206, 86, 1)'],
            borderColor: ['rgba(255, 206, 86, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
          padding: {
            left: 30,
            right: 30
          }
        },
          plugins: {
            datalabels: {
              color: 'black',
              anchor: 'end',
              align: 'end',
              font: {
                size: 10
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    }

}
