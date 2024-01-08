import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  endPoint =`${environment.api}/api/compra`
  constructor(private http:HttpClient) { }

  public getAlmacenes( ) {
    return this.http.get<Array<any>>(`${this.endPoint}/almacenes/all` ) ;
  }

  public getProveedores( ) {
    return this.http.get<Array<any>>(`${this.endPoint}/proveedores/all` ) ;
  }

  public index( ) {
    return this.http.get<Array<any>>(`${this.endPoint}` ) ;
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

  public close(id:any) {
    return this.http.get(`${this.endPoint}/close/${id}` ) ;
  }
}