import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  endPoint =`${environment.api}/api/empleado`
  constructor(private http:HttpClient) { }
  
  public getSucursales( ) {
    return this.http.get<Array<any>>(`${this.endPoint}/sucursales/all` ) ;
  }

  public getUsuarios( ) {
    return this.http.get<Array<any>>(`${this.endPoint}/usuarios/all` ) ;
  }

  public getCajas(id: number) {
    return this.http.get<Array<any>>(`${this.endPoint}/cajas/${id}` ) ;
  }

  public getAlmacenes(id: number) {
    return this.http.get<Array<any>>(`${this.endPoint}/almacenes/${id}` ) ;
  }

  public index( ) {
    return this.http.get<Array<any>>(`${this.endPoint}` ) ;
  }

  public getById(id:any) {
    return this.http.get<any>(`${this.endPoint}/${id}` ) ;
  }

  public getSucursalesById(id:any) {
    return this.http.get<any>(`${this.endPoint}/suc/${id}`) ;
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
