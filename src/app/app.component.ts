import { Component } from '@angular/core';
import { MenuItem } from './core/model/menu-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public menuItems : MenuItem[] = [
    { url: '/home', nombre: 'Home' },
    { url: '/login', nombre: 'Cerrar sesión' },
  ]
}
