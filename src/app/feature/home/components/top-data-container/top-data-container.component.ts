import { Component, AfterViewInit, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FiltersRequestWithoutArea, FiltersRequest, StadisticAreasResponse } from 'src/app/shared/model/filters.model';
import { ActivityService } from 'src/app/shared/service/activity.service';
import { DepartmentService } from 'src/app/shared/service/department.service';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

Chart.register(...registerables);

@Component({
  selector: 'app-top-data-container',
  templateUrl: './top-data-container.component.html',
  styleUrls: ['./top-data-container.component.scss']
})
export class TopDataContainerComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() filtersRequest: FiltersRequestWithoutArea | null = null;
  
  tipoEstructura: 'DIRECCION' | 'AREA' | 'SUBAREA' = 'DIRECCION';
  nombreArea: string = 'Dirección de Bienestar y Evangelización';
  imageUrl: string = 'assets/images/home-college.png';

  private participantsChart: Chart | null = null;

  constructor(
    private activityService: ActivityService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    // Los datos se cargarán después de inicializar el gráfico
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filtersRequest'] && this.participantsChart) {
      this.loadStatistics();
    }
  }

  ngAfterViewInit(): void {
    this.initializeChart();
    // Cargar datos después de inicializar el gráfico
    this.loadStatistics();
  }

  private initializeChart(): void {
    const ctx = document.getElementById('participantsChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.participantsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Participantes',
          data: [],
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

  private loadStatistics(): void {
    if (!this.filtersRequest || !this.nombreArea || !this.tipoEstructura) {
      this.updateChart([], []);
      return;
    }

    this.getAreaIdentifier().pipe(
      switchMap((idArea: string | null) => {
        if (!idArea) {
          return of([]);
        }

        const filtersRequest: FiltersRequest = {
          mes: this.filtersRequest!.mes ?? '',
          anno: this.filtersRequest!.anno ?? 0,
          semestre: this.filtersRequest!.semestre ?? '',
          programaAcademico: this.filtersRequest!.programaAcademico ?? '',
          tipoProgramaAcademico: this.filtersRequest!.tipoProgramaAcademico ?? '',
          centroCostos: this.filtersRequest!.centroCostos ?? '',
          tipoParticipante: this.filtersRequest!.tipoParticipante ?? '',
          indicador: this.filtersRequest!.indicador ?? '',
          tipoArea: this.tipoEstructura,
          idArea: idArea
        };

        return this.activityService.consultarEstadisticasParticipantesPorEstructura(filtersRequest);
      }),
      catchError(error => {
        console.error('Error al consultar estadísticas de participantes por estructura:', error);
        return of([]);
      })
    ).subscribe((statistics: StadisticAreasResponse[]) => {
      const labels = statistics.map(stat => stat.nombre);
      const data = statistics.map(stat => stat.cantidad);
      this.updateChart(labels, data);
    });
  }

  private updateChart(labels: string[], data: number[]): void {
    if (this.participantsChart) {
      this.participantsChart.data.labels = labels;
      this.participantsChart.data.datasets[0].data = data;
      this.participantsChart.update();
    }
  }

  private getAreaIdentifier(): Observable<string | null> {
    if (!this.nombreArea) {
      return of(null);
    }

    if (this.tipoEstructura === 'DIRECCION') {
      return this.departmentService.consultarPorNombre(this.nombreArea).pipe(
        switchMap(response => of(response?.identificador || null)),
        catchError(() => of(null))
      );
    }

    return of(null);
  }
}
