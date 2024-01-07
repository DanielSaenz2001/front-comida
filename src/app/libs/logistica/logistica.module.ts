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


@NgModule({
  declarations: [
    EstablecimientoComponent,
    SucursalComponent,
    AlmacenComponent,
    CajaComponent,
    EmpleadoComponent,
    TipoPagoComponent
  ],
  imports: [
    CommonModule,
    LogisticaRoutingModule
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
