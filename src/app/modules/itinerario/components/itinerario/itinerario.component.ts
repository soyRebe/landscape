import {Component, OnInit, TemplateRef, ChangeDetectorRef, ViewChild } from '@angular/core';
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
  @ViewChild('content') content: TemplateRef<any> | undefined;
  formNuevaActividad: FormGroup = new FormGroup({});
  actividades: Actividad[] = [];
  actividadesSinFecha: Actividad[] = [];
  actividadesConFecha: any = {};
  closeResult: string = '';
  loading: boolean = false;

  constructor(
    private actividadesService: ActividadesService,
    private offcanvasService: NgbOffcanvas,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
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

  agregarActividadConFecha(key: string, actividad: any): void {
    if (!this.actividadesConFecha[key]) {
      this.actividadesConFecha[key] = {};
      this.actividadesConFecha[key]['fecha'] = key;
      this.actividadesConFecha[key]['actividades'] = [];
    }

    this.actividadesConFecha[key]['actividades'].push(actividad);
  }

  getActividadPorIdActivity(activityId: number): Actividad | undefined {
    let actividad: Actividad | undefined = this.actividadesSinFecha.find( ( actividad: Actividad )=>{
      return actividad.activityId === activityId;
    });

    if(!actividad) {
      Object.values(this.actividadesConFecha).forEach( ( value: any ) => {
        if ( !actividad ) {
          actividad = value.actividades.find( ( actividad: Actividad ) => {
            return actividad.activityId === activityId;
          });
        };
      });
    };

    return actividad;
  }

  editar(activityId: number): void {
    const actividadAEditar = this.getActividadPorIdActivity(activityId);

    this.formNuevaActividad.get('nombre')?.setValue(actividadAEditar?.title)
    this.formNuevaActividad.get('fechaInicio')?.setValue(actividadAEditar?.startDate)
    this.formNuevaActividad.get('fechaFinalizacion')?.setValue(actividadAEditar?.endDate)

    if ( this.content ) {
      this.openNuevaActividad( this.content )
    }
  }

  agruparPorFechas(): void {
   this.actividades.forEach((actividad: Actividad)=>{
     if (actividad.startDate) {
       const startDate = new Date( actividad.startDate );
       const dia_mes = startDate.getDate() + '-' + ( startDate.getMonth() + 1);

       this.agregarActividadConFecha(dia_mes, actividad);

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

  agregarNuevaActividad(): void {
    const nombre: string = this.fActivity['nombre'].value;
    const fechaInicio: string = this.fActivity['fechaInicio'].value;
    const fechaFinalizacion: string = this.fActivity['fechaFinalizacion'].value;

   const maxActivityId = this.actividades.reduce((max, actividad) => Math.max(max, actividad.activityId), 0);

  // Calcular el nuevo activityId
  const nuevoActivityId = maxActivityId + 5;

    const dataTempActividades: Actividad = {
      'activityId':nuevoActivityId,
      'title': nombre,
      'type': 'ACTIVITY',
      'startDate': fechaInicio,
      'endDate': fechaFinalizacion,
      'status': 'IN_PROGRESS'
    }
   
   
    const startDate = new Date( fechaInicio );
    const dia_mes = startDate.getUTCDate() + '-' + ( startDate.getUTCMonth() + 1);

    this.agregarActividadConFecha(dia_mes, dataTempActividades);

    this.offcanvasService.dismiss();
   
  }

  eliminarActividad(activityId: number): void {    
    let indice: number | undefined = this.actividadesSinFecha.findIndex( ( actividad: Actividad )=>{
      return actividad.activityId === activityId;
    });

    if(indice !== -1) {
      this.actividadesSinFecha.splice(indice, 1);
    } else {
      Object.values(this.actividadesConFecha).forEach( ( value: any ) => {
        if ( indice === -1 ) {
          indice = value.actividades.findIndex( ( actividad: Actividad ) => {
            return actividad.activityId === activityId;
          });
        };

        if(indice !== -1) {
          value.actividades.splice(indice, 1);
          indice = -1;
        } 
      });
    }
  }
}
