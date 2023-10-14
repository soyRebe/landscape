import {Component, Input} from '@angular/core';

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

}
