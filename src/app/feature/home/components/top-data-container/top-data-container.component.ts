import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FiltersRequestWithoutArea } from 'src/app/shared/model/filters.model';

Chart.register(...registerables);

@Component({
  selector: 'app-top-data-container',
  templateUrl: './top-data-container.component.html',
  styleUrls: ['./top-data-container.component.scss']
})
export class TopDataContainerComponent implements AfterViewInit{
  @Input() filtersRequest: FiltersRequestWithoutArea | null = null;
  
  tipoEstructura: 'DIRECCION' | 'AREA' | 'SUBAREA' = 'DIRECCION';
  nombreArea: string = 'Dirección de Bienestar y Evangelización';
  imageUrl: string = 'assets/images/home-college.png';

  ngAfterViewInit(): void {
    const ctx = document.getElementById('participantsChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Bienestar', 'Evangelización', 'Hogar Santa María', 'Servicio y Atención al Usuario'],
        datasets: [{
          label: 'Participantes',
          data: [105, 75, 150, 90],
          backgroundColor: 'rgba(77, 153, 122, 1)',
          borderColor: 'rgba(77, 153, 122, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        layout: {
          padding: {
            left: 30
          }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        },
        plugins: {
          datalabels: {
            color: '#000',
            anchor: 'end',
            align: 'end',
            font: {
              size: 10
            },
            formatter: (value) => value
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }

}
