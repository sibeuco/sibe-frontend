# Componente Activities Table

Este componente muestra una tabla de actividades con la capacidad de realizar acciones sobre ellas.

## Características

- Muestra actividades con campos: Nombre, Colaborador, Fecha de Creación, Estado
- Botón "Realizar Actividad" que se habilita solo para actividades en estado "Pendiente"
- Botón amarillo usando las variables de color del proyecto
- Redirección configurable a diferentes módulos
- Estados visuales diferenciados (Pendiente, En curso, Finalizado)
- Diseño responsive

## Uso

### En el template HTML:

```html
<app-activities-table 
  [actividades]="listaActividades"
  (actividadSeleccionada)="onActividadSeleccionada($event)">
</app-activities-table>
```

### En el componente TypeScript:

```typescript
import { Component } from '@angular/core';
import { Actividad, EstadoActividad } from '../shared/model/actividad.model';

@Component({
  selector: 'app-ejemplo',
  templateUrl: './ejemplo.component.html'
})
export class EjemploComponent {
  listaActividades: Actividad[] = [
    {
      id: 1,
      nombreActividad: 'Taller de Bienestar',
      colaborador: 'Juan Pérez',
      fechaCreacion: new Date('2024-01-15'),
      estado: EstadoActividad.PENDIENTE
    },
    {
      id: 2,
      nombreActividad: 'Sesión de Evangelización',
      colaborador: 'María García',
      fechaCreacion: new Date('2024-01-14'),
      estado: EstadoActividad.EN_CURSO
    },
    {
      id: 3,
      nombreActividad: 'Actividad de Hogar',
      colaborador: 'Carlos López',
      fechaCreacion: new Date('2024-01-13'),
      estado: EstadoActividad.FINALIZADO
    }
  ];

  onActividadSeleccionada(actividad: Actividad): void {
    console.log('Actividad seleccionada:', actividad);
    // Aquí puedes agregar lógica adicional antes de la redirección
  }
}
```

## Propiedades de Entrada (Inputs)

- `actividades`: Array de objetos Actividad que se mostrarán en la tabla

## Eventos de Salida (Outputs)

- `actividadSeleccionada`: Emite el objeto Actividad cuando se hace clic en "Realizar Actividad"

## Modelo de Datos

```typescript
export interface Actividad {
  id: number;
  nombreActividad: string;
  colaborador: string;
  fechaCreacion: Date;
  estado: EstadoActividad;
}

export enum EstadoActividad {
  PENDIENTE = 'Pendiente',
  EN_CURSO = 'En curso',
  FINALIZADO = 'Finalizado'
}
```

## Estados Visuales

- **Pendiente**: Badge amarillo, botón habilitado
- **En curso**: Badge verde, botón deshabilitado
- **Finalizado**: Badge gris, botón deshabilitado

## Notas

- El componente es completamente reutilizable para diferentes áreas
- La redirección se maneja desde el componente padre a través del evento `actividadSeleccionada`
- El componente padre debe implementar la lógica de navegación según sus necesidades
- El diseño es responsive y se adapta a dispositivos móviles
