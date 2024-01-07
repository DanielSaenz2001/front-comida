import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from '../models/login-dto.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = `${environment.api}/api/auth`;

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/login`, data)
  }

  sendPasswordResetLink(data: any) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }
  
  changePassword(data: any) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }

  me(token: any){
    return this.http.get(`${this.baseUrl}/me` )
  }
}
