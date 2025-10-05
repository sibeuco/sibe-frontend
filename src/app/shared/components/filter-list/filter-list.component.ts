import { Component, EventEmitter, Output, OnInit } from '@angular/core';

export interface FilterData {
  year: string;
  semester: string;
  relation: string;
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

  // Opciones para los filtros
  years: number[] = [];
  semesters: string[] = ['1', '2'];
  academicRelations: string[] = [
    'Estudiante',
    'Profesor',
    'Administrativo',
    'Egresado',
    'Externo'
  ];

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
      relation: this.selectedRelation
    };

    this.filterApplied.emit(filterData);
  }

  clearFilters(): void {
    this.selectedYear = '';
    this.selectedSemester = '';
    this.selectedRelation = '';
  }

}
