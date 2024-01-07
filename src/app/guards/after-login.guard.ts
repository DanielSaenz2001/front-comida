import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginGuard implements CanActivate {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    if(!this.Token.loggedIn())
      this.router.navigateByUrl('/auth/login');
    return this.Token.loggedIn();

  }
  constructor(private Token: TokenService, private router: Router) {

  }
}
