import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ChangePasswordComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize passwords with empty strings', () => {
    expect(component.passwords.contrasenaActual).toBe('');
    expect(component.passwords.nuevaContrasena).toBe('');
    expect(component.passwords.confirmarContrasena).toBe('');
  });

  it('should alert when new passwords do not match', () => {
    spyOn(window, 'alert');
    spyOn(component.contrasenaActualizada, 'emit');

    component.passwords = {
      contrasenaActual: 'oldPass',
      nuevaContrasena: 'newPass1',
      confirmarContrasena: 'newPass2'
    };
    component.cambiarContrasena();

    expect(window.alert).toHaveBeenCalledWith('Las contraseñas nuevas no coinciden');
    expect(component.contrasenaActualizada.emit).not.toHaveBeenCalled();
  });

  it('should alert when new password equals current password', () => {
    spyOn(window, 'alert');
    spyOn(component.contrasenaActualizada, 'emit');

    component.passwords = {
      contrasenaActual: 'samePass',
      nuevaContrasena: 'samePass',
      confirmarContrasena: 'samePass'
    };
    component.cambiarContrasena();

    expect(window.alert).toHaveBeenCalledWith('La nueva contraseña debe ser diferente a la actual');
    expect(component.contrasenaActualizada.emit).not.toHaveBeenCalled();
  });

  it('should emit contrasenaActualizada with correct payload on valid submit', () => {
    spyOn(component.contrasenaActualizada, 'emit');

    component.passwords = {
      contrasenaActual: 'oldPass',
      nuevaContrasena: 'newPass',
      confirmarContrasena: 'newPass'
    };
    component.cambiarContrasena();

    expect(component.contrasenaActualizada.emit).toHaveBeenCalledWith({
      contrasenaActual: 'oldPass',
      nuevaContrasena: 'newPass'
    });
  });

  it('should reset form fields on limpiarFormulario', () => {
    component.passwords = {
      contrasenaActual: 'old',
      nuevaContrasena: 'new',
      confirmarContrasena: 'new'
    };

    component.limpiarFormulario();

    expect(component.passwords.contrasenaActual).toBe('');
    expect(component.passwords.nuevaContrasena).toBe('');
    expect(component.passwords.confirmarContrasena).toBe('');
  });

  it('should accept input bindings', () => {
    component.cambiandoContrasena = true;
    component.mensajeError = 'Error test';
    component.mensajeExito = 'Success test';

    expect(component.cambiandoContrasena).toBeTrue();
    expect(component.mensajeError).toBe('Error test');
    expect(component.mensajeExito).toBe('Success test');
  });

  describe('cerrarModal', () => {
    it('should not throw when modal element not found', () => {
      spyOn(document, 'getElementById').and.returnValue(null);
      expect(() => component.cerrarModal()).not.toThrow();
    });
  });

  it('should try to close modal on cerrarModal', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
    component.cerrarModal();
    expect(document.getElementById).toHaveBeenCalledWith('change-password-modal');
  });
});
