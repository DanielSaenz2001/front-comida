import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  endPoint =`${environment.api}/api/tipo-pago`
  constructor(private http:HttpClient) { }
  
  public getSucursales( ) {
    return this.http.get<Array<any>>(`${this.endPoint}/sucursales/all` ) ;
  }

  public index( ) {
    return this.http.get<Array<any>>(`${this.endPoint}` ) ;
  }

  public getById(id:any) {
    return this.http.get(`${this.endPoint}/${id}` ) ;
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

  //Sucursal
  public add(tipo_id: any, suc_id: any) {
    return this.http.get<any>(`${this.endPoint}/addSucursal/${tipo_id}/${suc_id}` );
  }

  public dlt(tipo_id: any, suc_id: any) {
    return this.http.get<any>(`${this.endPoint}/dltSucursal/${tipo_id}/${suc_id}` );
  }
}
