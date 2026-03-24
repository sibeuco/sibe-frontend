import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() paginaActual = 0;
  @Input() totalPaginas = 0;
  @Input() totalElementos = 0;
  @Input() tamanioPagina = 10;
  @Output() cambioPagina = new EventEmitter<number>();

  get inicio(): number {
    return this.totalElementos === 0 ? 0 : this.paginaActual * this.tamanioPagina + 1;
  }

  get fin(): number {
    return Math.min((this.paginaActual + 1) * this.tamanioPagina, this.totalElementos);
  }

  get paginas(): (number | '...')[] {
    const total = this.totalPaginas;
    const actual = this.paginaActual;
    const items: (number | '...')[] = [];

    if (total <= 7) {
      for (let i = 0; i < total; i++) items.push(i);
      return items;
    }

    items.push(0);
    if (actual > 2) items.push('...');

    const start = Math.max(1, actual - 1);
    const end = Math.min(total - 2, actual + 1);
    for (let i = start; i <= end; i++) items.push(i);

    if (actual < total - 3) items.push('...');
    items.push(total - 1);

    return items;
  }

  irAPagina(pagina: number): void {
    if (pagina >= 0 && pagina < this.totalPaginas && pagina !== this.paginaActual) {
      this.cambioPagina.emit(pagina);
    }
  }

  anterior(): void {
    this.irAPagina(this.paginaActual - 1);
  }

  siguiente(): void {
    this.irAPagina(this.paginaActual + 1);
  }
}
