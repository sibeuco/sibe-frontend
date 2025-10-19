import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserSession } from 'src/app/feature/login/model/user-session.model';
import { StateProps } from 'src/app/shared/model/state.enum';
import { StateService } from 'src/app/shared/service/state.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  userSession$!: Observable<UserSession | undefined>;
  
  isLogged$!: Observable<boolean>;

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
}