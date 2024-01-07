import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticaRoutingModule } from './logistica-routing.module';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/pipes/format-date-picker';
import { EstablecimientoComponent } from './pages/establecimiento/establecimiento.component';
import { SucursalComponent } from './pages/sucursal/sucursal.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';
import { CajaComponent } from './pages/caja/caja.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { TipoPagoComponent } from './pages/tipo-pago/tipo-pago.component';
import { EstablecimientoFormComponent } from './pages/establecimiento/form/establecimiento-form.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { SurcursalFormComponent } from './pages/sucursal/form/surcursal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CajaFormComponent } from './pages/caja/form/caja-form.component';
import { AlmacenFormComponent } from './pages/almacen/form/almacen-form.component';
import { TipoPagoFormComponent } from './pages/tipo-pago/form/tipo-pago-form.component';
import { TipoPagoDetalleComponent } from './pages/tipo-pago/detalle/tipo-pago-detalle.component';
import { EmpleadoFormComponent } from './pages/empleado/form/empleado-form.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { ProveedorFormComponent } from './pages/proveedor/form/proveedor-form.component';


@NgModule({
  declarations: [
    EstablecimientoComponent,
    SucursalComponent,
    AlmacenComponent,
    CajaComponent,
    EmpleadoComponent,
    TipoPagoComponent,
    EstablecimientoFormComponent,
    SurcursalFormComponent,
    CajaFormComponent,
    AlmacenFormComponent,
    TipoPagoFormComponent,
    TipoPagoDetalleComponent,
    EmpleadoFormComponent,
    ProveedorComponent,
    ProveedorFormComponent
  ],
  imports: [
    SharedMaterialModule,
    CommonModule,
    LogisticaRoutingModule,
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
export class LogisticaModule { }
