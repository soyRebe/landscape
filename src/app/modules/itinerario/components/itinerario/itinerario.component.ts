import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActividadesService} from "../../../../services/actividades.service";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Actividad} from "../../../../interfaces/actividad";

@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.component.html',
  styleUrls: ['./itinerario.component.scss']
})
export class ItinerarioComponent implements OnInit{
  formNuevaActividad: FormGroup = new FormGroup({});
  actividades: Actividad[] = [];
  actividadesSinFecha: Actividad[] = [];
  actividadesConFecha: any = {};
  closeResult: string = '';
  loading: boolean = false;

  constructor(
    private actividadesService: ActividadesService,
    private offcanvasService: NgbOffcanvas,
    private fb: FormBuilder
  ) {
    this.formNuevaActividad = this.fb.group({
      nombre: ['',[Validators.required]],
      fechaInicio: ['',[Validators.required]],
      fechaFinalizacion: ['',[Validators.required]],
    })
  }

  ngOnInit() {
    this.loading = true;
    this.actividadesService.obtenerActividades().subscribe({
      next:( response: any )=> {
       this.actividades = response;
       this.agruparPorFechas();
       this.loading = false;
      },
      error: () => {
        console.log('ocurrio un error');
        
      }
    })
  }

  agruparPorFechas(): void {
   this.actividades.forEach((actividad: Actividad)=>{
     if (actividad.startDate) {
       const startDate = new Date( actividad.startDate );
       const dia_mes = startDate.getDate() + '-' + ( startDate.getMonth() + 1);

       if (!this.actividadesConFecha[dia_mes]) {
         this.actividadesConFecha[dia_mes] = {};
         this.actividadesConFecha[dia_mes]['fecha'] = dia_mes;
         this.actividadesConFecha[dia_mes]['actividades'] = [];
       }

       this.actividadesConFecha[dia_mes]['actividades'].push(actividad);

     } else {
       this.actividadesSinFecha.push(actividad);
     }
   });
  }

  objectKeys(obj: any): any[] {
    return Object.keys(obj);
  }

  openNuevaActividad(content: TemplateRef<any>): void {
    this.offcanvasService.open(content, { position: 'end' });
  }

  get fActivity(): { [key: string]: AbstractControl } {
    return this.formNuevaActividad.controls;
  }
}
