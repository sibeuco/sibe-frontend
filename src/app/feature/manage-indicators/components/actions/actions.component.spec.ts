import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import * as bootstrap from 'bootstrap';

import { ActionsComponent } from './actions.component';
import { ActionService } from '../../service/action.service';
import { PaginatedResponse } from 'src/app/shared/model/paginated-response.model';
import { ActionResponse } from '../../model/action.model';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;
  let mockActionService: jasmine.SpyObj<ActionService>;

  const mockAcciones: ActionResponse[] = [
    { identificador: 'a1', detalle: 'Detalle 1', objetivo: 'Objetivo 1' },
    { identificador: 'a2', detalle: 'Detalle 2', objetivo: 'Objetivo 2' }
  ];

  const mockPaginatedResponse: PaginatedResponse<ActionResponse> = {
    contenido: mockAcciones,
    totalElementos: 2,
    totalPaginas: 1,
    paginaActual: 0
  };

  beforeEach(() => {
    mockActionService = jasmine.createSpyObj('ActionService', ['consultarAccionesPaginado']);
    mockActionService.consultarAccionesPaginado.and.returnValue(of(mockPaginatedResponse));

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ActionsComponent],
      providers: [
        { provide: ActionService, useValue: mockActionService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load actions', () => {
      fixture.detectChanges();
      expect(mockActionService.consultarAccionesPaginado).toHaveBeenCalled();
      expect(component.acciones).toEqual(mockAcciones);
    });
  });

  describe('obtenerAcciones', () => {
    it('should populate acciones and pagination data', () => {
      component.obtenerAcciones();
      expect(component.acciones).toEqual(mockAcciones);
      expect(component.accionesFiltradas).toEqual(mockAcciones);
      expect(component.totalElementos).toBe(2);
      expect(component.totalPaginas).toBe(1);
      expect(component.cargando).toBeFalse();
    });

    it('should pass trimmed searchTerm', () => {
      component.searchTerm = '  test  ';
      component.obtenerAcciones();
      expect(mockActionService.consultarAccionesPaginado).toHaveBeenCalledWith(0, 10, 'test');
    });

    it('should handle null contenido', () => {
      mockActionService.consultarAccionesPaginado.and.returnValue(of({
        contenido: null as any, totalElementos: 0, totalPaginas: 0, paginaActual: 0
      }));
      component.obtenerAcciones();
      expect(component.acciones).toEqual([]);
    });

    it('should handle error', () => {
      mockActionService.consultarAccionesPaginado.and.returnValue(throwError(() => new Error('fail')));
      component.obtenerAcciones();
      expect(component.error).toBe('No se pudieron cargar las acciones.');
      expect(component.cargando).toBeFalse();
    });
  });

  describe('filterActions', () => {
    it('should reset page to 0 and reload', () => {
      component.paginaActual = 5;
      component.filterActions();
      expect(component.paginaActual).toBe(0);
    });
  });

  describe('cambiarPagina', () => {
    it('should set page and reload', () => {
      component.cambiarPagina(3);
      expect(mockActionService.consultarAccionesPaginado).toHaveBeenCalledWith(3, 10, undefined);
    });
  });

  describe('abrirModalEdicion', () => {
    it('should set accionSeleccionada', () => {
      component.abrirModalEdicion(mockAcciones[0]);
      expect(component.accionSeleccionada).toEqual(mockAcciones[0]);
    });
  });

  describe('onAccionModificada', () => {
    it('should update action in list and clear selection', () => {
      component.acciones = [...mockAcciones];
      const modified = { ...mockAcciones[0], detalle: 'Modified' };
      component.onAccionModificada(modified);
      expect(component.acciones[0].detalle).toBe('Modified');
      expect(component.accionSeleccionada).toBeNull();
    });

    it('should not fail if action not found in list', () => {
      component.acciones = [...mockAcciones];
      const unknown = { identificador: 'unknown', detalle: 'X', objetivo: 'Y' };
      expect(() => component.onAccionModificada(unknown)).not.toThrow();
    });
  });

  describe('onAccionCancelada', () => {
    it('should clear selection', () => {
      component.accionSeleccionada = mockAcciones[0];
      component.onAccionCancelada();
      expect(component.accionSeleccionada).toBeNull();
    });
  });

  describe('abrirModalEdicion with DOM element', () => {
    it('should show modal when element exists', () => {
      const mockModal = { show: jasmine.createSpy('show') };
      spyOn(bootstrap.Modal, 'getInstance').and.returnValue(mockModal as any);
      spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
      component.abrirModalEdicion(mockAcciones[0]);
      expect(mockModal.show).toHaveBeenCalled();
    });
  });

  describe('cerrarModal with DOM element', () => {
    it('should hide modal when element and instance exist', () => {
      const mockModal = { hide: jasmine.createSpy('hide') };
      spyOn(bootstrap.Modal, 'getInstance').and.returnValue(mockModal as any);
      spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
      component.onAccionCancelada();
      expect(mockModal.hide).toHaveBeenCalled();
    });
  });
});
