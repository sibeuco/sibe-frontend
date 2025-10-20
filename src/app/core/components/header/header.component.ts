import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserSession } from 'src/app/feature/login/model/user-session.model';
import { StateProps } from 'src/app/shared/model/state.enum';
import { StateService } from 'src/app/shared/service/state.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  userSession$!: Observable<UserSession | undefined>;
  
  isLogged$!: Observable<boolean>;
  
  // Propiedad para controlar el dropdown
  mostrarDropdown: boolean = false;

  constructor(private stateService: StateService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.userSession$ = this.stateService.select<UserSession>(StateProps.USER_SESSION);

    this.isLogged$ = this.userSession$.pipe(
      map(session => !!session && session.logged)
    );
  }

  logout(): void {
    // 1. Limpia el estado global (esto hará que isLogged$ emita 'false')
    this.stateService.deleteProperty(StateProps.USER_SESSION);

    // 2. Limpia el token guardado en la sesión del navegador
    window.sessionStorage.removeItem('Authorization');

    // 3. Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }

  /**
   * Abre el modal de cambio de contraseña
   */
  abrirModalCambiarContrasena(): void {
    const modalElement = document.getElementById('change-password-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  }

  /**
   * Maneja el evento cuando se actualiza la contraseña
   */
  onContrasenaActualizada(response: any): void {
    console.log('Contraseña actualizada:', response);
    // Aquí puedes agregar lógica adicional si es necesario
    // Por ejemplo, mostrar un mensaje de éxito
  }

  /**
   * Alterna la visibilidad del dropdown
   */
  toggleDropdown(): void {
    this.mostrarDropdown = !this.mostrarDropdown;
  }

  /**
   * Cierra el dropdown
   */
  cerrarDropdown(): void {
    this.mostrarDropdown = false;
  }

  /**
   * Listener para cerrar el dropdown cuando se hace clic fuera
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.dropdown');
    
    if (!dropdown) {
      this.cerrarDropdown();
    }
  }
}