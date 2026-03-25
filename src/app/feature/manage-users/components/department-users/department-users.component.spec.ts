import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { DepartmentUsersComponent } from './department-users.component';
import { UserService } from 'src/app/shared/service/user.service';
import { UserNotificationService } from '../../service/user-notification.service';
import { DepartmentService } from 'src/app/shared/service/department.service';
import { PaginatedResponse } from 'src/app/shared/model/paginated-response.model';
import { UserResponse } from 'src/app/shared/model/user.model';

describe('DepartmentUsersComponent', () => {
  let component: DepartmentUsersComponent;
  let fixture: ComponentFixture<DepartmentUsersComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockDepartmentService: jasmine.SpyObj<DepartmentService>;
  let mockNotificationService: UserNotificationService;

  const mockUsuarios: UserResponse[] = [
    {
      identificador: '1', nombres: 'Juan', apellidos: 'Perez', correo: 'jp@test.com',
      identificacion: { tipoIdentificacion: 'CC', numeroIdentificacion: '123' } as any,
      tipoUsuario: { identificador: 'tu1', nombre: 'Admin' } as any,
      estaActivo: true
    },
    {
      identificador: '2', nombres: 'Ana', apellidos: 'Lopez', correo: 'al@test.com',
      identificacion: { tipoIdentificacion: 'CC', numeroIdentificacion: '456' } as any,
      tipoUsuario: { identificador: 'tu1', nombre: 'Admin' } as any,
      estaActivo: true
    }
  ];

  const mockPaginatedResponse: PaginatedResponse<UserResponse> = {
    contenido: mockUsuarios,
    totalElementos: 2,
    totalPaginas: 1,
    paginaActual: 0
  };

  const mockDepartments = [
    { identificador: 'd1', nombre: 'Dirección 1' },
    { identificador: 'd2', nombre: 'Dirección 2' }
  ];

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj('UserService', ['consultarUsuariosPaginado', 'eliminarUsuario']);
    mockUserService.consultarUsuariosPaginado.and.returnValue(of(mockPaginatedResponse));
    mockUserService.eliminarUsuario.and.returnValue(of({ valor: 'eliminado' }));

    mockDepartmentService = jasmine.createSpyObj('DepartmentService', ['consultarDirecciones']);
    mockDepartmentService.consultarDirecciones.and.returnValue(of(mockDepartments));

    mockNotificationService = new UserNotificationService();

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DepartmentUsersComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: UserNotificationService, useValue: mockNotificationService },
        { provide: DepartmentService, useValue: mockDepartmentService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(DepartmentUsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call obtenerUsuarios, suscribirseANotificaciones, and cargarDepartamentos', () => {
      spyOn(component, 'obtenerUsuarios');
      spyOn(component, 'suscribirseANotificaciones');
      spyOn(component, 'cargarDepartamentos');
      component.ngOnInit();
      expect(component.obtenerUsuarios).toHaveBeenCalled();
      expect(component.suscribirseANotificaciones).toHaveBeenCalled();
      expect(component.cargarDepartamentos).toHaveBeenCalled();
    });
  });

  describe('obtenerUsuarios', () => {
    it('should load users and set pagination data on success', () => {
      component.obtenerUsuarios();
      expect(mockUserService.consultarUsuariosPaginado).toHaveBeenCalledWith(0, 10, undefined, 'Administrador de dirección');
      expect(component.usuarios).toEqual(mockUsuarios);
      expect(component.usuariosFiltrados).toEqual(mockUsuarios);
      expect(component.totalElementos).toBe(2);
      expect(component.totalPaginas).toBe(1);
      expect(component.cargando).toBeFalse();
    });

    it('should use searchTerm when set', () => {
      component.searchTerm = '  Juan  ';
      component.obtenerUsuarios();
      expect(mockUserService.consultarUsuariosPaginado).toHaveBeenCalledWith(0, 10, 'Juan', 'Administrador de dirección');
    });

    it('should handle error', () => {
      mockUserService.consultarUsuariosPaginado.and.returnValue(throwError(() => new Error('fail')));
      component.obtenerUsuarios();
      expect(component.error).toBe('No se pudieron cargar los usuarios.');
      expect(component.cargando).toBeFalse();
    });

    it('should adjust page when response is empty and not on first page', () => {
      const emptyResponse: PaginatedResponse<UserResponse> = {
        contenido: [],
        totalElementos: 10,
        totalPaginas: 2,
        paginaActual: 2
      };
      mockUserService.consultarUsuariosPaginado.and.returnValues(of(emptyResponse), of(mockPaginatedResponse));
      component.paginaActual = 2;
      component.obtenerUsuarios();
      expect(component.paginaActual).toBe(0);
    });
  });

  describe('cargarDepartamentos', () => {
    it('should load departments on success', () => {
      component.cargarDepartamentos();
      expect(component.listaDepartamentos.length).toBe(2);
      expect(component.listaDepartamentos[0].nombre).toBe('Dirección 1');
      expect(component.cargandoDepartamentos).toBeFalse();
    });

    it('should handle error loading departments', () => {
      mockDepartmentService.consultarDirecciones.and.returnValue(throwError(() => new Error('fail')));
      component.cargarDepartamentos();
      expect(component.cargandoDepartamentos).toBeFalse();
    });
  });

  describe('filtrarUsuarios', () => {
    it('should reset page and reload', () => {
      component.paginaActual = 3;
      component.filtrarUsuarios();
      expect(component.paginaActual).toBe(0);
      expect(mockUserService.consultarUsuariosPaginado).toHaveBeenCalled();
    });
  });

  describe('cambiarPagina', () => {
    it('should set page and reload', () => {
      component.cambiarPagina(2);
      expect(mockUserService.consultarUsuariosPaginado).toHaveBeenCalledWith(2, 10, undefined, 'Administrador de dirección');
    });
  });

  describe('seleccionarUsuarioParaEditar', () => {
    it('should emit event with user and tipoComponente=department', () => {
      spyOn(component.usuarioSeleccionadoParaEditar, 'emit');
      const user = mockUsuarios[0];
      component.seleccionarUsuarioParaEditar(user);
      expect(component.usuarioSeleccionadoParaEditar.emit).toHaveBeenCalledWith({
        usuario: user,
        tipoComponente: 'department'
      });
    });
  });

  describe('eliminarUsuario', () => {
    it('should set usuarioAEliminar and clear modal state', () => {
      component.eliminarUsuario(mockUsuarios[0]);
      expect(component.usuarioAEliminar).toEqual(mockUsuarios[0]);
      expect(component.eliminando).toBeFalse();
      expect(component.mostrarMensajeExito).toBeFalse();
    });
  });

  describe('confirmarEliminacion', () => {
    it('should do nothing if no user selected', () => {
      component.usuarioAEliminar = null;
      component.confirmarEliminacion();
      expect(mockUserService.eliminarUsuario).not.toHaveBeenCalled();
    });

    it('should call eliminarUsuario service and show success', fakeAsync(() => {
      component.usuarioAEliminar = mockUsuarios[0];
      component.confirmarEliminacion();
      expect(mockUserService.eliminarUsuario).toHaveBeenCalledWith('1');
      expect(component.eliminando).toBeFalse();
      expect(component.mensajeExito).toBe('Usuario eliminado exitosamente');
      expect(component.mostrarMensajeExito).toBeTrue();
      tick(2000);
    }));

    it('should handle error on elimination', () => {
      component.usuarioAEliminar = mockUsuarios[0];
      mockUserService.eliminarUsuario.and.returnValue(throwError(() => ({ error: { mensaje: 'Error custom' } })));
      spyOn(window, 'alert');
      component.confirmarEliminacion();
      expect(component.eliminando).toBeFalse();
    });
  });

  describe('suscribirseANotificaciones', () => {
    it('should reload users on notification events', () => {
      fixture.detectChanges();
      mockUserService.consultarUsuariosPaginado.calls.reset();

      mockNotificationService.notificarUsuarioCreado({});
      expect(mockUserService.consultarUsuariosPaginado).toHaveBeenCalledTimes(1);

      mockUserService.consultarUsuariosPaginado.calls.reset();
      mockNotificationService.notificarUsuarioActualizado({});
      expect(mockUserService.consultarUsuariosPaginado).toHaveBeenCalledTimes(1);

      mockUserService.consultarUsuariosPaginado.calls.reset();
      mockNotificationService.notificarUsuarioEliminado({});
      expect(mockUserService.consultarUsuariosPaginado).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe all subscriptions', () => {
      fixture.detectChanges();
      expect((component as any).subscriptions.length).toBeGreaterThan(0);
      const spies = (component as any).subscriptions.map((s: any) => spyOn(s, 'unsubscribe'));
      component.ngOnDestroy();
      spies.forEach((s: jasmine.Spy) => expect(s).toHaveBeenCalled());
    });
  });
});
