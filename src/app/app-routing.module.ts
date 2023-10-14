import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'itinerario', loadChildren: () => import('./modules/itinerario/itinerario.module')
      .then(m => m.ItinerarioModule)
  },
  {path: '**', redirectTo: 'itinerario', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
