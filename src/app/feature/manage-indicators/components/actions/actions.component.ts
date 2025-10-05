import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit{

  searchTerm: string = '';
  acciones = [
    { detalle: 'educar para seguir avanzando en el control de la vida', objetivo: 'educar' },
    { detalle: 'acción 2', objetivo: 'Ayudar a la mejora institucional' },
    { detalle: 'acción 78', objetivo: 'Pausas activas para mejorar el bienestar' }
  ];
  accionesFiltradas = [...this.acciones];

  ngOnInit(): void {
    this.accionesFiltradas = this.acciones;
  }

  filterActions(): void {
    const term = this.searchTerm.toLowerCase();
    this.accionesFiltradas = this.acciones.filter(action =>
      Object.values(action).some(value =>
        value.toLowerCase().includes(term)
      )
    );
  }

}
