import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http: HttpClient) { }

  obtenerActividades(): Observable<any> {
    const url = 'https://api.mockfly.dev/mocks/223e1e97-b946-45af-87ed-367bd0e0748b/getActivities';
    return this.http.get(url);
  }

}
