import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ILoginResponse } from '../../models/login-dto.model';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) { 
    this.initialComponent();
  }
  
  ngOnInit(): void {

  }

  private initialComponent(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password:  new FormControl(null, Validators.required),
    });
  }

  public login() {
    this.loginService.login(this.loginForm.value).subscribe({
      next: (response) => this.saveUserLogin(response),
      error: (e) => console.log(e),
    });
  }

  private saveUserLogin(loginResponse: ILoginResponse) {
    this.tokenService.set(loginResponse.access_token);
    this.tokenService.setModulos(loginResponse.permisos);
    this.tokenService.setDni(loginResponse.dni);
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl('/');
  }
}
