import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDataUsuarioIndex } from '../models/data-usuario-index.model';
import { IPermiso } from '../models/permiso.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  endPoint =`${environment.api}/api/usuario`
  
  constructor(private http:HttpClient) { }

  public get( ){
    return this.http.get<IDataUsuarioIndex>(`${this.endPoint}` ) ;
  }

  public filtro(p:any, m:any, n:any, d:any) {
    return this.http.get<any>(`${this.endPoint}/filtro/${p}/${m}/${n}/${d}` );
  }

  public getById(id:any){
    return this.http.get<any>(`${this.endPoint}/${id}` );
  }

  public getPermisosById(id:any){
    return this.http.get<{puser: IPermiso[], permi: IPermiso[]}>(`${this.endPoint}/permiso/${id}` );
  }

  public create(data:any) {
    return this.http.post<any>(`${this.endPoint}`, data );
  }

  public update(id:any, data:any) {
    return this.http.put<any>(`${this.endPoint}/${id}`, data );
  }

  public delete(id:any) {
    return this.http.delete<any>(`${this.endPoint}/${id}` );
  }

  public estado(id:any){
    return this.http.get<any>(`${this.endPoint}/estado/${id}` );
  }

  //Permisos
  public addPermiso(user_id: any, perm_id: any) {
    return this.http.get<any>(`${this.endPoint}/addPermiso/${user_id}/${perm_id}` );
  }

  public dltPermiso(user_id: any, perm_id: any) {
    return this.http.get<any>(`${this.endPoint}/dltPermiso/${user_id}/${perm_id}` );
  }

  getUserAtUrl(url:string) {
    return this.http.get<IDataUsuarioIndex>(url) ;
  }
}