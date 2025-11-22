import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-participants',
  templateUrl: './total-participants.component.html',
  styleUrls: ['./total-participants.component.scss']
})
export class TotalParticipantsComponent {
  @Input() imageUrl: string = 'assets/images/home-college.png';
  @Input() tipoEstructura: 'DIRECCION' | 'AREA' | 'SUBAREA' = 'DIRECCION';
  @Input() nombreArea: string = '';
  @Input() totalParticipantes: number = 0;
}
