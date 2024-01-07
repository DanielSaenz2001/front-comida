import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginGuard implements CanActivate {
  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    if(this.Token.loggedIn())
      this.router.navigateByUrl('/');
    return !this.Token.loggedIn();
  }
  constructor(private Token: TokenService, private router: Router) { }
}
