import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent {
  
  // Datos quemados para pruebas
  private readonly CODIGO_VALIDO = '123456';
  
  // Control de pasos
  currentStep: number = 1;
  
  // Datos del formulario
  correo: string = '';
  codigo: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  
  // Mensajes
  mensajeError: string = '';
  mensajeExito: string = '';
  
  constructor(private router: Router) {}
  
  // Paso 1: Enviar código al correo
  enviarCodigo() {
    this.mensajeError = '';
    this.mensajeExito = '';
    
    if (!this.correo || !this.validarEmail(this.correo)) {
      this.mensajeError = 'Por favor ingresa un correo válido';
      return;
    }
    
    // Simulación: código enviado
    this.mensajeExito = 'Código enviado al correo.';
    setTimeout(() => {
      this.currentStep = 2;
    }, 1500);
  }
  
  // Paso 2: Validar código
  validarCodigo() {
    this.mensajeError = '';
    this.mensajeExito = '';
    
    if (!this.codigo) {
      this.mensajeError = 'Por favor ingresa el código';
      return;
    }
    
    // Validar con código quemado
    if (this.codigo !== this.CODIGO_VALIDO) {
      this.mensajeError = 'Código incorrecto.';
      return;
    }
    
    this.mensajeExito = 'Código validado correctamente';
    setTimeout(() => {
      this.currentStep = 3;
    }, 1000);
  }
  
  // Paso 3: Cambiar contraseña
  cambiarContrasena() {
    this.mensajeError = '';
    this.mensajeExito = '';
    
    if (!this.nuevaContrasena || !this.confirmarContrasena) {
      this.mensajeError = 'Por favor completa todos los campos';
      return;
    }
    
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.mensajeError = 'Las contraseñas no coinciden';
      return;
    }
    
    if (this.nuevaContrasena.length < 6) {
      this.mensajeError = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }
    
    // Simulación de éxito
    this.mensajeExito = 'Contraseña cambiada exitosamente. Redirigiendo...';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
  
  // Volver al paso anterior
  volverPaso() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.mensajeError = '';
      this.mensajeExito = '';
    }
  }
  
  // Volver al login
  volverLogin() {
    this.router.navigate(['/login']);
  }
  
  // Validar formato de email
  private validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
