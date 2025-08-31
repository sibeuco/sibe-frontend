import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);

@Component({
  selector: 'app-bottom-data',
  templateUrl: './bottom-data.component.html',
  styleUrls: ['./bottom-data.component.scss']
})
export class BottomDataComponent implements AfterViewInit{

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
            backgroundColor: ['rgba(29, 52, 117, 1)'],
            borderColor: ['rgba(29, 52, 117, 1)'],
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
