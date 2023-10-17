import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent {
  @Input('title') title: string = '';
  @Input('type') type: string = '';
  @Input('startDate') startDate: string = '';
  @Input('endDate') endDate: string = '';
  @Input('status') status: string = '';
  @Input('activityId') activityId: number = 0;

  @Output() eventEditarActividad: EventEmitter<number> = new EventEmitter<number>();
  @Output() eventEliminarActividad: EventEmitter<number> = new EventEmitter<number>();

  editarActividad(): void {
    this.eventEditarActividad.emit(this.activityId);
  }

  eliminarActividad(): void {
    this.eventEliminarActividad.emit(this.activityId);
  }
}
