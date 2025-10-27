import { Component, OnInit } from '@angular/core';
import { ActionResponse } from '../../model/action.model';
import { ActionService } from '../../service/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit{

  searchTerm: string = '';
  acciones: ActionResponse[] = [];
  accionesFiltradas: ActionResponse[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(private actionService: ActionService) {}

  ngOnInit(): void {
    this.obtenerAcciones();
  }

  obtenerAcciones(): void {
    this.cargando = true;
    this.error = '';

    this.actionService.consultarAcciones().subscribe({
      next: (data) => {
        this.acciones = data;
        this.accionesFiltradas = [...this.acciones];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener acciones:', err);
        this.error = 'No se pudieron cargar las acciones.';
        this.cargando = false;
      }
    });
  }

  filterActions(): void {
    const term = this.searchTerm.toLowerCase();
    this.accionesFiltradas = this.acciones.filter(action =>
      Object.values(action).some(value =>
        value && value.toString().toLowerCase().includes(term)
      )
    );
  }

}
