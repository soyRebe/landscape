import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItinerarioComponent} from "./components/itinerario/itinerario.component";

const routes: Routes = [
  {path: '', component: ItinerarioComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItinerarioRoutingModule { }
