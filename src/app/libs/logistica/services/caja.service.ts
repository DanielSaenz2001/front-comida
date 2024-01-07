import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  endPoint =`${environment.api}/api/caja`
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
