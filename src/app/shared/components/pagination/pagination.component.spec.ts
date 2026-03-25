import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, CommonModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('deberiaEmitirEventoAlCambiarPagina', () => {
    component.totalPaginas = 5;
    component.paginaActual = 0;
    spyOn(component.cambioPagina, 'emit');

    component.irAPagina(2);

    expect(component.cambioPagina.emit).toHaveBeenCalledWith(2);
  });

  it('deberiaDeshabilitarAnteriorEnPrimeraPagina', () => {
    component.totalPaginas = 5;
    component.paginaActual = 0;
    component.totalElementos = 50;
    fixture.detectChanges();

    const anteriorBtn = fixture.nativeElement.querySelector('.page-item');
    expect(anteriorBtn.classList.contains('disabled')).toBeTrue();
  });

  it('deberiaDeshabilitarSiguienteEnUltimaPagina', () => {
    component.totalPaginas = 5;
    component.paginaActual = 4;
    component.totalElementos = 50;
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.page-item');
    const siguienteBtn = items[items.length - 1];
    expect(siguienteBtn.classList.contains('disabled')).toBeTrue();
  });

  it('deberiaMostrarIndicadorRegistros', () => {
    component.totalPaginas = 3;
    component.paginaActual = 1;
    component.totalElementos = 25;
    component.tamanioPagina = 10;
    fixture.detectChanges();

    const texto = fixture.nativeElement.querySelector('small').textContent;
    expect(texto).toContain('11');
    expect(texto).toContain('20');
    expect(texto).toContain('25');
  });

  it('no deberia emitir evento cuando la pagina es la misma', () => {
    component.totalPaginas = 5;
    component.paginaActual = 2;
    spyOn(component.cambioPagina, 'emit');

    component.irAPagina(2);

    expect(component.cambioPagina.emit).not.toHaveBeenCalled();
  });

  it('no deberia renderizar cuando no hay elementos', () => {
    component.totalElementos = 0;
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.d-flex');
    expect(container).toBeNull();
  });

  it('should return 0 for inicio when no elements', () => {
    component.totalElementos = 0;
    expect(component.inicio).toBe(0);
  });

  it('should calculate inicio correctly', () => {
    component.totalElementos = 25;
    component.paginaActual = 1;
    component.tamanioPagina = 10;
    expect(component.inicio).toBe(11);
  });

  it('should calculate fin correctly', () => {
    component.totalElementos = 25;
    component.paginaActual = 2;
    component.tamanioPagina = 10;
    expect(component.fin).toBe(25);
  });

  it('should generate pages without ellipsis for <= 7 pages', () => {
    component.totalPaginas = 5;
    component.paginaActual = 2;
    expect(component.paginas).toEqual([0, 1, 2, 3, 4]);
  });

  it('should generate pages with ellipsis for > 7 pages at start', () => {
    component.totalPaginas = 10;
    component.paginaActual = 1;
    const pages = component.paginas;
    expect(pages[0]).toBe(0);
    expect(pages).toContain(1);
    expect(pages).toContain('...');
    expect(pages[pages.length - 1]).toBe(9);
  });

  it('should generate pages with ellipsis for > 7 pages at end', () => {
    component.totalPaginas = 10;
    component.paginaActual = 8;
    const pages = component.paginas;
    expect(pages[0]).toBe(0);
    expect(pages).toContain('...');
    expect(pages[pages.length - 1]).toBe(9);
  });

  it('should generate pages with double ellipsis in middle', () => {
    component.totalPaginas = 10;
    component.paginaActual = 5;
    const pages = component.paginas;
    expect(pages[0]).toBe(0);
    expect(pages[pages.length - 1]).toBe(9);
    const dots = pages.filter(p => p === '...');
    expect(dots.length).toBe(2);
  });

  it('should navigate to previous page via anterior()', () => {
    component.totalPaginas = 5;
    component.paginaActual = 2;
    spyOn(component.cambioPagina, 'emit');
    component.anterior();
    expect(component.cambioPagina.emit).toHaveBeenCalledWith(1);
  });

  it('should navigate to next page via siguiente()', () => {
    component.totalPaginas = 5;
    component.paginaActual = 2;
    spyOn(component.cambioPagina, 'emit');
    component.siguiente();
    expect(component.cambioPagina.emit).toHaveBeenCalledWith(3);
  });

  it('should not emit for out-of-range page', () => {
    component.totalPaginas = 5;
    component.paginaActual = 0;
    spyOn(component.cambioPagina, 'emit');
    component.irAPagina(-1);
    expect(component.cambioPagina.emit).not.toHaveBeenCalled();
  });

  it('should not emit for page >= total', () => {
    component.totalPaginas = 5;
    component.paginaActual = 4;
    spyOn(component.cambioPagina, 'emit');
    component.irAPagina(5);
    expect(component.cambioPagina.emit).not.toHaveBeenCalled();
  });
});
