import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPermiso } from '../models/permiso.model';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  endPoint =`${environment.api}/api/permiso`
  constructor(private http:HttpClient) { }

  public index( ) {
    return this.http.get<Array<IPermiso>>(`${this.endPoint}` ) ;
  }

  public getById(id:any) {
    return this.http.get(`${this.endPoint}/${id}` ) ;
  }

  public create(data:any) {
    return this.http.post(`${this.endPoint}`, data ) ;
  }

  public update(id:any, data:any) {
    return this.http.put(`${this.endPoint}/${id}`, data ) ;
  }

  public destroy(id:any) {
    return this.http.delete(`${this.endPoint}/${id}` ) ;
  }
}