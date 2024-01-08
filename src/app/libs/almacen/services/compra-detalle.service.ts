import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompraDetalleService {

  endPoint =`${environment.api}/api/compra-detalle`
  constructor(private http:HttpClient) { }

  public getProductos(id: string | number) {
    return this.http.get<any>(`${this.endPoint}/productos/${id}`) ;
  }

  public index(id: string | number) {
    return this.http.get<any>(`${this.endPoint}/${id}`) ;
  }

  public getById(id:any) {
    return this.http.get(`${this.endPoint}/get/${id}` ) ;
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
