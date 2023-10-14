import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItinerarioRoutingModule } from './itinerario-routing.module';
import { ItinerarioComponent } from './components/itinerario/itinerario.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ActivityCardComponent} from "../../components/activity-card/activity-card.component";


@NgModule({
  declarations: [
    ItinerarioComponent,
    ActivityCardComponent
  ],
  exports: [
    ItinerarioComponent
  ],
  imports: [
    CommonModule,
    ItinerarioRoutingModule,
    ReactiveFormsModule
  ]
})
export class ItinerarioModule { }
