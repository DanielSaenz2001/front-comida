import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeforeLoginGuard } from './guards/before-login.guard';
import { AfterLoginGuard } from './guards/after-login.guard';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ScaComponent } from './libs/sca/sca.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./libs/auth/auth.module").then(m => m.AuthModule),
    canActivate:[BeforeLoginGuard]
  },
  {
    path: '',
    component: InicioComponent,
    canActivate:[AfterLoginGuard]
  },
  {
    path: 'modulo',
    canActivate:[AfterLoginGuard],
    component: ScaComponent,
    children:[
      {
        path: 'seguridad',
        loadChildren: () => import("./libs/seguridad/seguridad.module").then(m => m.SeguridadModule)
      },
      
      {
        path: 'logistica',
        loadChildren: () => import("./libs/logistica/logistica.module").then(m => m.LogisticaModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
