import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  endPoint =`${environment.api}/api/gestion-almacen`
  constructor(private http:HttpClient) { }

  public getAlmacenes( ) {
    return this.http.get<Array<any>>(`${this.endPoint}/almacenes` ) ;
  }

  public index(id:any) {
    return this.http.get<any>(`${this.endPoint}/${id}` ) ;
  }

  public getById(id:any) {
    return this.http.get(`${this.endPoint}/get/${id}` ) ;
  }

  public getProductos(id:any) {
    return this.http.get<Array<any>>(`${this.endPoint}/productos/${id}` ) ;
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
