import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/shared/service/activity.service';

export interface FilterData {
  year: string;
  semester: string;
  relation: string;
  month: string;
  costCenter: string;
  academicProgram: string;
  programType: string;
  indicator: string;
}

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {

  @Output() filterApplied = new EventEmitter<FilterData>();

  // Propiedades para los valores seleccionados
  selectedYear: string = '';
  selectedSemester: string = '';
  selectedRelation: string = '';
  selectedMonth: string = '';
  selectedCostCenter: string = '';
  selectedAcademicProgram: string = '';
  selectedProgramType: string = '';
  selectedIndicator: string = '';

  // Opciones para los filtros
  years: string[] = [];
  semesters: string[] = [];
  months: string[] = [];
  academicRelations: string[] = [];
  costCenters: string[] = [];
  academicPrograms: string[] = [];
  programTypes: string[] = [];
  indicators: string[] = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.loadYears();
    this.loadMonths();
    this.loadSemesters();
    this.loadAcademicRelations();
    this.loadCostCenters();
    this.loadAcademicPrograms();
    this.loadProgramTypes();
    this.loadIndicators();
  }

  private loadYears(): void {
    this.activityService.consultarAnnosEjecucionesFinalizadas().subscribe({
      next: (response: string[]) => {
        if (response && response.length > 0) {
          this.years = response;
        }
      },
      error: (error) => {
        console.error('Error al cargar los años:', error);
        this.years = [];
      }
    });
  }

  private loadMonths(): void {
    this.activityService.consultarMesesEjecucionesFinalizadas().subscribe({
      next: (response: string[]) => {
        if (response && response.length > 0) {
          this.months = response;
        }
      },
      error: (error) => {
        console.error('Error al cargar los meses:', error);
        this.months = [];
      }
    });
  }

  private loadSemesters(): void {
    this.activityService.consultarSemestresEstudiantesEnEjecucionesFinalizadas().subscribe({
      next: (response: string[]) => {
        if (response && response.length > 0) {
          this.semesters = response;
        }
      },
      error: (error) => {
        console.error('Error al cargar los semestres:', error);
        this.semesters = [];
      }
    });
  }

  private loadAcademicRelations(): void {
    this.activityService.consultarTiposParticipantesEnEjecucionesFinalizadas().subscribe({
      next: (response: string[]) => {
        if (response && response.length > 0) {
          this.academicRelations = response;
        }
      },
      error: (error) => {
        console.error('Error al cargar las relaciones académicas:', error);
        this.academicRelations = [];
      }
    });
  }

  private loadCostCenters(): void {
    this.activityService.consultarCentrosCostosEmpleadosEnEjecucionesFinalizadas().subscribe({
      next: (response: string[]) => {
        if (response && response.length > 0) {
          this.costCenters = response;
        }
      },
      error: (error) => {
        console.error('Error al cargar los centros de costos:', error);
        this.costCenters = [];
      }
    });
  }

  private loadAcademicPrograms(): void {
    this.activityService.consultarProgramasAcademicosEstudiantesEnEjecucionesFinalizadas().subscribe({
      next: (response: string[]) => {
        if (response && response.length > 0) {
          this.academicPrograms = response;
        }
      },
      error: (error) => {
        console.error('Error al cargar los programas académicos:', error);
        this.academicPrograms = [];
      }
    });
  }

  private loadProgramTypes(): void {
    this.activityService.consultarNivelesFormacionEstudiantesEnEjecucionesFinalizadas().subscribe({
      next: (response: string[]) => {
        if (response && response.length > 0) {
          this.programTypes = response;
        }
      },
      error: (error) => {
        console.error('Error al cargar los tipos de programa:', error);
        this.programTypes = [];
      }
    });
  }

  private loadIndicators(): void {
    this.activityService.consultarIndicadoresEnEjecucionesFinalizadas().subscribe({
      next: (response: string[]) => {
        if (response && response.length > 0) {
          this.indicators = response;
        }
      },
      error: (error) => {
        console.error('Error al cargar los indicadores:', error);
        this.indicators = [];
      }
    });
  }

  onFilter(): void {
    const filterData: FilterData = {
      year: this.selectedYear,
      semester: this.selectedSemester,
      relation: this.selectedRelation,
      month: this.selectedMonth,
      costCenter: this.selectedCostCenter,
      academicProgram: this.selectedAcademicProgram,
      programType: this.selectedProgramType,
      indicator: this.selectedIndicator
    };

    this.filterApplied.emit(filterData);
  }

  clearFilters(): void {
    this.selectedYear = '';
    this.selectedSemester = '';
    this.selectedRelation = '';
    this.selectedMonth = '';
    this.selectedCostCenter = '';
    this.selectedAcademicProgram = '';
    this.selectedProgramType = '';
    this.selectedIndicator = '';
  }

}
