import { Injectable } from '@angular/core';
import { IPermiso } from '../libs/auth/models/permiso.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {};

  constructor() { }

  //#region Token

  handle(token: string) {
    this.set(token);
  }

  set(token: string) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }
  
  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  payload(token: string) {
    //token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU5MjcwMjkyMiwiZXhwIjoxNTkyNzA2NTIyLCJuYmYiOjE1OTI3MDI5MjIsImp0aSI6Im5EMzk5dXYwSllRR3QxTWciLCJzdWIiOjIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.yu90nafdKbx2a0gPilFXOYwSf_T1Wb3tXFGXXFFoNvU"
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

  //#endregion Token

  //#region USER DATA

  setModulos(array: IPermiso[]){
    localStorage.setItem('modulos', JSON.stringify(array));
  }
  getModulos(){
    return localStorage.getItem('modulos');
  }

  setDni(dni: string){
    localStorage.setItem('dni', dni);
  }
  getDni(){
    return localStorage.getItem('dni');
  }

  //#endregion
}