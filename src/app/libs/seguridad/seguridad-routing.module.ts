import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { LinkComponent } from './pages/link/link.component';
import { PermisoComponent } from './pages/permiso/permiso.component';
import { LinkDetailComponent } from './pages/link/detail/link-detail.component';

const routes: Routes = [
  {path: 'usuarios', component: UsuarioComponent},
  {path: 'links', component: LinkComponent},
  {path: 'links/:linkId', component: LinkDetailComponent},
  {path: 'permisos', component: PermisoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
