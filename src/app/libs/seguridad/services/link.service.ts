import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILink } from '../models/link.model';
import { IChildren } from '../models/children.model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  endPoint =`${environment.api}/api/link`
  constructor(private http:HttpClient) { }

  public index( ) {
    return this.http.get<Array<ILink>>(`${this.endPoint}` ) ;
  }

  public getById(id:any ) {
    return this.http.get<{link: ILink, childrens: ILink[]}>(`${this.endPoint}/${id}` ) ;
  }

  public getChildrenById(id:any ) {
    return this.http.get<IChildren>(`${this.endPoint}/children/${id}` ) ;
  }
  
  public create(data:any ) {
    return this.http.post(`${this.endPoint}`, data ) ;
  }

  public update(id:any, data:any ) {
    return this.http.put(`${this.endPoint}/${id}`, data ) ;
  }

  public destroy(id:any ) {
    return this.http.delete(`${this.endPoint}/${id}` ) ;
  }
  //Permisos
  public addPermiso(user_id: any, perm_id: any)  {
    return this.http.get<any>(`${this.endPoint}/addPermiso/${user_id}/${perm_id}` );
  }

  public dltPermiso(user_id: any, perm_id: any)  {
    return this.http.get<any>(`${this.endPoint}/dltPermiso/${user_id}/${perm_id}` );
  }
}