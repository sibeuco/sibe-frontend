import { Component, OnInit } from '@angular/core';
import { IndicatorService } from '../../service/indicator.service';
import { IndicatorResponse } from '../../model/indicator.model';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit{

  searchTerm: string = '';
  indicadores: IndicatorResponse[] = [];
  indicadoresFiltrados: IndicatorResponse[] = [];

  constructor(private indicatorService: IndicatorService) {}

  ngOnInit(): void {
    this.loadIndicators();
  }

  loadIndicators(): void {
    this.indicatorService.consultarIndicadores().subscribe({
      next: (indicadores) => {
        this.indicadores = indicadores;
        this.indicadoresFiltrados = indicadores;
      },
      error: (error) => {
        console.error('Error al cargar los indicadores:', error);
      }
    });
  }

  filterIndicators(): void {
    const term = this.searchTerm.toLowerCase();
    this.indicadoresFiltrados = this.indicadores.filter(indicator =>
      indicator.nombre.toLowerCase().includes(term) ||
      indicator.tipoIndicador.tipologiaIndicador.toLowerCase().includes(term) ||
      indicator.proyecto.nombre.toLowerCase().includes(term)
    );
  }

}
