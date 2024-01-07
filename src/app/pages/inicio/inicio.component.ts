import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPermiso } from 'src/app/libs/auth/models/permiso.model';
import { AuthService } from 'src/app/libs/auth/services/auth.service';
import { LoginService } from 'src/app/libs/auth/services/login.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  
  modulos = new Array<IPermiso>();

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    var modules: any = this.tokenService.getModulos()
    this.modulos = JSON.parse(modules);
  }

  enterModule(module: IPermiso) {
    let link = "modulo" + module.link;
    this.router.navigateByUrl(link);
  }

  logout() {
    this.tokenService.remove();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('/auth/login');
  }
}
