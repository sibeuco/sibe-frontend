import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/shared/service/activity.service';
import { DepartmentService } from 'src/app/shared/service/department.service';
import { AreaService } from 'src/app/shared/service/area.service';
import { SubAreaService } from 'src/app/shared/service/subarea.service';
import { FiltersRequestWithoutArea } from 'src/app/shared/model/filters.model';
import { FiltersRequest } from 'src/app/shared/model/filters.model';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-total-participants',
  templateUrl: './total-participants.component.html',
  styleUrls: ['./total-participants.component.scss']
})
export class TotalParticipantsComponent implements OnInit, OnChanges {
  @Input() imageUrl: string = 'assets/images/home-college.png';
  @Input() tipoEstructura: 'DIRECCION' | 'AREA' | 'SUBAREA' = 'DIRECCION';
  @Input() nombreArea: string = '';
  @Input() filtersRequest: FiltersRequestWithoutArea | null = null;
  
  totalParticipantes: number = 0;

  constructor(
    private activityService: ActivityService,
    private departmentService: DepartmentService,
    private areaService: AreaService,
    private subAreaService: SubAreaService
  ) {}

  ngOnInit(): void {
    this.loadTotalParticipants();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filtersRequest'] || changes['tipoEstructura'] || changes['nombreArea']) {
      this.loadTotalParticipants();
    }
  }

  private loadTotalParticipants(): void {
    if (!this.filtersRequest || !this.nombreArea || !this.tipoEstructura) {
      this.totalParticipantes = 0;
      return;
    }

    // Obtener el identificador del área según el tipo de estructura
    this.getAreaIdentifier().pipe(
      switchMap((idArea: string | null) => {
        if (!idArea) {
          return of(0);
        }

        // Construir el FiltersRequest completo
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

        // Llamar al servicio
        return this.activityService.contarParticipantesTotales(filtersRequest);
      }),
      catchError(error => {
        console.error('Error al contar participantes totales:', error);
        return of(0);
      })
    ).subscribe((total: number) => {
      this.totalParticipantes = total;
    });
  }

  private getAreaIdentifier(): Observable<string | null> {
    if (!this.nombreArea) {
      return of(null);
    }

    switch (this.tipoEstructura) {
      case 'DIRECCION':
        return this.departmentService.consultarPorNombre(this.nombreArea).pipe(
          switchMap(response => of(response?.identificador || null)),
          catchError(() => of(null))
        );
      case 'AREA':
        return this.areaService.consultarPorNombre(this.nombreArea).pipe(
          switchMap(response => of(response?.identificador || null)),
          catchError(() => of(null))
        );
      case 'SUBAREA':
        return this.subAreaService.consultarPorNombre(this.nombreArea).pipe(
          switchMap(response => of(response?.identificador || null)),
          catchError(() => of(null))
        );
      default:
        return of(null);
    }
  }
}
