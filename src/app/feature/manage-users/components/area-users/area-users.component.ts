import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-users',
  templateUrl: './area-users.component.html',
  styleUrls: ['./area-users.component.scss']
})
export class AreaUsersComponent implements OnInit{

  searchTerm: string = '';
  usuarios = [
    { nombre: 'Daniel García', correo: 'daniel@example.com', rol: 'Administrador' },
    { nombre: 'Laura Mejía', correo: 'laura@example.com', rol: 'Colaborador' },
    { nombre: 'Carlos Torres', correo: 'carlos@example.com', rol: 'Colaborador' }
  ];
  usuariosFiltrados = [...this.usuarios];

  ngOnInit(): void {
    this.usuariosFiltrados = this.usuarios;
  }

  filterUsers(): void {
    const term = this.searchTerm.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(user =>
      Object.values(user).some(value =>
        value.toLowerCase().includes(term)
      )
    );
  }

}
