import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OlvideContraseniaComponent } from './pages/olvide-contrasenia/olvide-contrasenia.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'olvide-contra', component: OlvideContraseniaComponent},
  {path: 'recuperar', component: RecuperarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
