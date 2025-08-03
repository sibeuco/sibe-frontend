import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit{

  searchTerm: string = '';
  indicadores = [
    { nombre: 'Satisfacción grupos de Interés', tipologia: 'eficacia', proyecto: 'Proyecto 1' },
    { nombre: 'Nivel satisfracción', tipologia: 'impacto', proyecto: 'Proyecto 7' },
    { nombre: 'Reducción de quejas y reclamos', tipologia: 'efectividad', proyecto: 'Proyecto 2' }
  ];
  indicadoresFiltrados = [...this.indicadores];

  ngOnInit(): void {
    this.indicadoresFiltrados = this.indicadores;
  }

  filterIndicators(): void {
    const term = this.searchTerm.toLowerCase();
    this.indicadoresFiltrados = this.indicadores.filter(indicator =>
      Object.values(indicator).some(value =>
        value.toLowerCase().includes(term)
      )
    );
  }

}
