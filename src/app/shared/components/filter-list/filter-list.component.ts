import { Component, EventEmitter, Output, OnInit } from '@angular/core';

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
export class FilterListComponent implements OnInit{

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
  years: number[] = [];
  semesters: string[] = ['1', '2'];
  months: string[] = ['Enero - Junio', 'Agosto - Diciembre'];
  academicRelations: string[] = [
    'Estudiante',
    'Profesor',
    'Externo'
  ];
  costCenters: string[] = [];
  academicPrograms: string[] = [];
  programTypes: string[] = [];
  indicators: string[] = [];

  constructor() {
    this.generateYears();
  }

  ngOnInit(): void {}

  private generateYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const endYear = currentYear + 2;

    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
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
