import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-bottom-data-container',
  templateUrl: './bottom-data-container.component.html',
  styleUrls: ['./bottom-data-container.component.scss']
})
export class BottomDataContainerComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    const ctx = document.getElementById('myBarChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'Participantes',
          data: [10, 75, 150, 100, 120, 20, 15, 95, 62, 36, 21],
          backgroundColor: [
            'rgba(4, 181, 172, 1)'
          ],
          borderColor: [
            'rgba(4, 181, 172, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
