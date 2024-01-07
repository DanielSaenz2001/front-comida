import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { LinkComponent } from './pages/link/link.component';
import { PermisoComponent } from './pages/permiso/permiso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { PermisoFormComponent } from './pages/permiso/form/permiso-form.component';
import { UsuarioFormComponent } from './pages/usuario/form/usuario-form.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/pipes/format-date-picker';
import { UsuarioPermisoComponent } from './pages/usuario/permiso/usuario-permiso.component';
import { LinkFormComponent } from './pages/link/form/link-form.component';
import { LinkDetailComponent } from './pages/link/detail/link-detail.component';
import { LinkPermisoComponent } from './pages/link/permiso/link-permiso.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    LinkComponent,
    PermisoComponent,
    PermisoFormComponent,
    UsuarioFormComponent,
    UsuarioPermisoComponent,
    LinkFormComponent,
    LinkDetailComponent,
    LinkPermisoComponent
  ],
  imports: [
    SharedMaterialModule,
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS,
    },
  ],
})
export class SeguridadModule { }
